"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

// Helper to format file size
function formatBytes(bytes: number, decimals = 1) {
  if (!+bytes) return '0 KB';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function addOitDocument(formData: FormData) {
  const indicator = parseInt(formData.get("indicator") as string);
  const oitCode = formData.get("oitCode") as string;
  const name = formData.get("name") as string;
  const file = formData.get("file") as File;
  
  if (!file || file.size === 0) {
    return { success: false, error: "No file uploaded" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const safeName = file.name ? file.name.replace(/[^a-zA-Z0-9.-]/g, '_') : 'document.pdf';
    const filename = `${uniqueSuffix}-${safeName}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "ita");
    
    await mkdir(uploadDir, { recursive: true });
    
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    
    const url = `/uploads/ita/${filename}`;
    const size = formatBytes(file.size);

    await prisma.oitDocument.create({
      data: { indicator, oitCode, name, url, size }
    });
    
    revalidatePath("/th/ita");
    revalidatePath("/th/admin/ita");
    return { success: true };
  } catch (error) {
    console.error("Failed to add OIT document with upload:", error);
    return { success: false, error: "File upload or database transaction failed" };
  }
}

export async function deleteOitDocument(id: string) {
  try {
    const doc = await prisma.oitDocument.findUnique({ where: { id } });
    if (doc && doc.url && doc.url.startsWith('/uploads/ita/')) {
        const filepath = path.join(process.cwd(), "public", doc.url);
        try {
            await unlink(filepath);
        } catch (fileErr) {
            // Ignore if file doesn't exist
        }
    }

    await prisma.oitDocument.delete({ where: { id } });
    revalidatePath("/th/ita");
    revalidatePath("/th/admin/ita");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete OIT document:", error);
    return { success: false };
  }
}

