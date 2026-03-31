"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createArticle(data: { title: string; content: string; category: string; imageUrl?: string; published: boolean; authorId?: string }) {
  await prisma.article.create({ data });
  revalidatePath("/th/admin/articles");
  revalidatePath("/th/articles");
  return { success: true };
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/th/admin/articles");
  revalidatePath("/th/articles");
  return { success: true };
}
