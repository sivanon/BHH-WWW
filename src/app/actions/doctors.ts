"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";
import { put } from '@vercel/blob';

const createDoctorSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  specialty: z.string().min(1, "Specialty is required").max(100),
  experience: z.coerce.number().min(0).max(100),
  availableHours: z.string().min(1).max(100),
  location: z.string().min(1).max(200),
  imageUrl: z.string().url().optional().nullable(),
});

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized Access");
  return session;
}

export async function createDoctor(formData: FormData) {
  await checkAuth();

  let finalImageUrl: string | null = null;
  try {
    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.warn("BLOB_READ_WRITE_TOKEN missing. Skipping image upload.");
      } else {
        const blob = await put(imageFile.name, imageFile, { access: 'public' });
        finalImageUrl = blob.url;
      }
    }
  } catch (err) {
    console.error("Vercel Blob Upload Error:", err);
  }

  const rawData = {
    name: formData.get("name") as string,
    specialty: formData.get("specialty") as string,
    experience: formData.get("experience") as string,
    availableHours: formData.get("availableHours") as string || "09.00 - 16.00",
    location: formData.get("location") as string || "Main Hospital Building",
    imageUrl: finalImageUrl,
  };

  const parsed = createDoctorSchema.safeParse(rawData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const validData = parsed.data;

  await prisma.doctor.create({
    data: {
      name: validData.name,
      specialty: validData.specialty,
      experience: validData.experience,
      availableHours: validData.availableHours,
      location: validData.location,
      imageUrl: validData.imageUrl,
    }
  });

  revalidatePath("/th/admin/doctors");
  revalidatePath("/en/admin/doctors");
  revalidatePath("/th/doctors");
  revalidatePath("/en/doctors");
}

export async function deleteDoctor(id: string) {
  await checkAuth();
  await prisma.doctor.delete({ where: { id } });
  revalidatePath("/th/admin/doctors");
  revalidatePath("/en/admin/doctors");
  revalidatePath("/th/doctors");
  revalidatePath("/en/doctors");
}
