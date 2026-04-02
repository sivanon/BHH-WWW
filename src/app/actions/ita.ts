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
  const selection = formData.get("oitSelection") as string;
  const [indicatorStr, oitCode] = selection.split("|");
  const indicator = parseInt(indicatorStr);
  
  const name = formData.get("name") as string;
  const file = formData.get("file") as File;
  
  if (!file || file.size === 0) {
    return { success: false, error: "No file uploaded" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Instead of saving to the Vercel filesystem which is read-only and blocks uploads,
    // we convert the file to a Data URI and save it natively in PostgreSQL.
    // This allows seamless zero-config document hosting for PDF files.
    const base64Data = buffer.toString('base64');
    const mimeType = file.type || 'application/pdf';
    const dataUri = `data:${mimeType};base64,${base64Data}`;
    
    const size = formatBytes(file.size);

    await prisma.oitDocument.create({
      data: { 
        indicator, 
        oitCode, 
        name, 
        url: dataUri, 
        size 
      }
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
    // We no longer need to unlink physical files since we use Data URIs
    await prisma.oitDocument.delete({ where: { id } });
    revalidatePath("/th/ita");
    revalidatePath("/th/admin/ita");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete OIT document:", error);
    return { success: false };
  }
}

