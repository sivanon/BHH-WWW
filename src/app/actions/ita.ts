"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addOitDocument(formData: FormData) {
  const indicator = parseInt(formData.get("indicator") as string);
  const oitCode = formData.get("oitCode") as string;
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;
  const size = (formData.get("size") as string) || "0 KB";

  try {
    await prisma.oitDocument.create({
      data: { indicator, oitCode, name, url, size }
    });
    revalidatePath("/th/ita");
    revalidatePath("/th/admin/ita");
    return { success: true };
  } catch (error) {
    console.error("Failed to add OIT document:", error);
    return { success: false, error: "Database transaction failed" };
  }
}

export async function deleteOitDocument(id: string) {
  try {
    await prisma.oitDocument.delete({ where: { id } });
    revalidatePath("/th/ita");
    revalidatePath("/th/admin/ita");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete OIT document:", error);
    return { success: false };
  }
}
