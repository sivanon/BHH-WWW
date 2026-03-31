import { prisma } from "@/lib/prisma";
import { PenTool } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function DynamicCorporatePage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  
  // Directly pull managed content from PostgreSQL/SQLite Prisma Database
  const pageData = await prisma.pageContent.findUnique({ where: { slug: "pdpa" } });

  return (
    <div className="flex flex-col font-sans">
      <div className="bg-gradient-to-br from-primary to-blue-900 py-24 text-white text-center relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">{pageData?.title || "PDPA (คลิกเพื่ออ่านพ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล)"}</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">ศูนย์ข้อมูลอิเล็กทรอนิกส์และนโยบายระดับคุณภาพของโรงพยาบาล</p>
        </div>
      </div>

      <main className="flex-grow bg-gray-50 py-16 text-left">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-14 border border-gray-100 min-h-[400px]">
            {pageData?.content ? (
              <div className="prose prose-lg max-w-none prose-p:text-gray-700 prose-p:leading-loose prose-headings:text-gray-900 whitespace-pre-wrap">
                {pageData.content}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="bg-yellow-100 p-5 rounded-full mb-6">
                   <PenTool className="w-12 h-12 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-800 mb-3">ยังไม่มีเนื้อหาสำหรับหัวข้อนี้ครับ</h3>
                <p className="text-gray-500 font-medium max-w-md">ระบบตรวจพบว่าหน้าเว็บไซต์นี้ยังไม่ถูกตั้งค่าข้อความโดย Admin กรุณาเข้าไปที่ระบบหลังบ้าน (Admin CMS) หมวด **"จัดการหน้าองค์กร"** เพื่อเขียนและบันทึกข้อความ ระบบจะโหลดขึ้นมาแสดงที่นี่ทันทีครับ!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}