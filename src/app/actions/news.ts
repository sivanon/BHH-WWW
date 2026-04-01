"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";

const createNewsSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
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

  let debugLog = "DEBUG INFO:\\n";
  try {
    const imageFile = formData.get("image") as File | null;
    debugLog += `File detected: ${imageFile ? "YES" : "NO"}\\n`;
    if (imageFile) debugLog += `File size: ${imageFile.size}\\n`;
    debugLog += `Token exists: ${!!process.env.BLOB_READ_WRITE_TOKEN}\\n`;

    if (imageFile && imageFile.size > 0) {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        debugLog += "Warning: Missing BLOB Token.\\n";
      } else {
        debugLog += "Attempting Blob put...\\n";
        const blob = await put(imageFile.name, imageFile, { access: 'public' });
        finalImageUrl = blob.url;
        debugLog += `Blob success! URL: ${blob.url}\\n`;
      }
    }
  } catch (err: any) {
    debugLog += `EXCEPTION: ${err.message}\\n`;
  }

  const rawData = {
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    content: (formData.get("content") as string || "") + "\\n\\n" + debugLog,
    imageUrl: finalImageUrl,
    attachmentUrl: finalAttachmentUrl,
  };

  const parsed = createNewsSchema.safeParse(rawData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
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
