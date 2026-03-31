"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePageContent(formData: FormData) {
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  try {
    await prisma.pageContent.upsert({
      where: { slug },
      update: { title, content },
      create: { slug, title, content }
    });
    
    // Invalidate caches to show dynamic DB data on public faces instantly
    if (slug === 'projects') {
      revalidatePath("/th/projects");
    } else {
      revalidatePath(`/th/about/${slug}`);
    }
    revalidatePath("/th/admin/pages");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update page content:", error);
    return { success: false, error: "Database transaction failed" };
  }
}
