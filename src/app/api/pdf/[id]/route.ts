import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Fetch document from database
    const doc = await prisma.oitDocument.findUnique({
      where: { id }
    });

    if (!doc || !doc.url.startsWith("data:")) {
      return new NextResponse("Not Found or Invalid Format", { status: 404 });
    }

    // Typical doc.url: data:application/pdf;base64,JVBERi0x...
    const matches = doc.url.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return new NextResponse("Invalid Base64 format in database", { status: 500 });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `inline; filename="${doc.oitCode || 'document'}.pdf"`
      }
    });
  } catch (error) {
    console.error("Error serving PDF:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
