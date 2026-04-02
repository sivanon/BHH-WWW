"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";

const createNewsSchema = z.object({
  title: z.string().min(1, "Title is required").max(2000),
  category: z.string().min(1, "Category is required").max(50),
  content: z.string().optional().default(""),
  imageUrl: z.string().url().optional().nullable(),
  attachmentUrl: z.string().url().optional().nullable(),
});

import { put } from '@vercel/blob';

// Security Helper
async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized Access");
  return session;
}

export async function createNews(formData: FormData) {
  await checkAuth();

  let finalImageUrl: string | null = null;
  let finalAttachmentUrl: string | null = null;
  let trace = "";

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    trace += "[NO BLOB TOKEN] ";
  }

  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    try {
      const blob = await put(imageFile.name, imageFile, { access: 'public' });
      finalImageUrl = blob.url;
    } catch (e: any) {
      trace += `[IMAGE PUT ERROR: ${e.message}] `;
    }
  } else {
    trace += `[NO IMG FILE FOUND OR SIZE 0] `;
  }

  const attachmentFile = formData.get("attachment") as File | null;
  if (attachmentFile && attachmentFile.size > 0) {
    try {
      const blob = await put(attachmentFile.name, attachmentFile, { access: 'public' });
      finalAttachmentUrl = blob.url;
    } catch (e: any) {
      trace += `[PDF PUT ERROR: ${e.message}] `;
    }
  } else {
    trace += `[NO PDF FILE FOUND OR SIZE 0] `;
  }

  const rawData = {
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    content: (formData.get("content") as string || "") + (trace ? `\n\nDEBUG: ${trace}` : ""),
    imageUrl: finalImageUrl,
    attachmentUrl: finalAttachmentUrl,
  };

  const parsed = createNewsSchema.safeParse(rawData);
  if (!parsed.success) {
    await prisma.news.create({
      data: {
        title: `Validation Error: ${String(parsed.error.issues[0].path[0])} -> ${parsed.error.issues[0].message}`,
        category: "pr",
        content: `Raw payload was: ${JSON.stringify(rawData)}`,
      }
    });
    revalidatePath("/th/admin/news");
    return;
  }

  const validData = parsed.data;

  await prisma.news.create({
    data: {
      title: validData.title,
      category: validData.category,
      content: validData.content,
      imageUrl: validData.imageUrl,
      attachmentUrl: validData.attachmentUrl,
    }
  });

  revalidatePath("/");
  revalidatePath("/th/admin/news");
  revalidatePath("/en/admin/news");
}

export async function deleteNews(id: string) {
  await checkAuth();

  await prisma.news.delete({ where: { id } });
  
  revalidatePath("/");
  revalidatePath("/th/admin/news");
  revalidatePath("/en/admin/news");
}
