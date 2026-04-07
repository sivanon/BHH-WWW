import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShieldCheck, PenTool, FileText, UserCircle, BookOpen } from "lucide-react";

export default async function AdminDashboard() {
  const newsCount = await prisma.news.count();
  const doctorCount = await prisma.doctor.count();
  // We can mock counts for the rest or add real queries later
  const articleCount = 0; // Replace with actual query if applicable
  const pagesCount = 5; 

  return (
    <div className="max-w-6xl mx-auto py-4">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">ภาพรวมระบบ (Dashboard Overview)</h1>
        <p className="text-lg text-gray-500">ยินดีต้อนรับสู่ศูนย์กลางการจัดการข้อมูลเว็บไซต์โรงพยาบาล โปรดเลือกระบบที่ต้องการจัดการด้านล่าง</p>
      </div>
      
      <div className="space-y-12">
        {/* Section 1: Content Management */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-3">
              <FileText className="w-5 h-5" />
            </span>
            จัดการเนื้อหาเว็บไซต์ (Content Management)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* News Card */}
            <Link href="news" className="group block bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 transform group-hover:scale-110 transition-transform duration-500">
                <FileText className="w-32 h-32 text-blue-600" />
              </div>
              <div className="relative z-10">
                <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">ข่าวสารและประกาศ</h3>
                <p className="text-gray-500 text-sm mb-6 h-10">จัดการประกาศข่าวสารและอัปเดตกิจกรรมต่างๆ บนหน้าแรกเว็บไซต์</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="text-sm font-semibold text-blue-600 group-hover:underline">จัดการข่าวสาร &rarr;</span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{newsCount} รายการ</span>
                </div>
              </div>
            </Link>

            {/* Articles Card */}
            <Link href="articles" className="group block bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 transform group-hover:scale-110 transition-transform duration-500">
                <BookOpen className="w-32 h-32 text-emerald-600" />
              </div>
              <div className="relative z-10">
                <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">บทความสุขภาพ</h3>
                <p className="text-gray-500 text-sm mb-6 h-10">สร้างและแก้ไขบทความสาระความรู้ด้านสุขภาพสำหรับประชาชน</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="text-sm font-semibold text-emerald-600 group-hover:underline">จัดการบทความ &rarr;</span>
                </div>
              </div>
            </Link>

            {/* Pages Card */}
            <Link href="pages" className="group block bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 transform group-hover:scale-110 transition-transform duration-500">
                <PenTool className="w-32 h-32 text-purple-600" />
              </div>
              <div className="relative z-10">
                <div className="bg-purple-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <PenTool className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">หน้าเพจองค์กร (CMS)</h3>
                <p className="text-gray-500 text-sm mb-6 h-10">ปรับปรุงข้อมูลคงที่ เช่น ข้อมูลผู้บริหาร โครงสร้าง นโยบาย</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="text-sm font-semibold text-purple-600 group-hover:underline">แก้ไขหน้าเว็บคงที่ &rarr;</span>
                </div>
              </div>
            </Link>

          </div>
        </section>

        {/* Section 2: Internal Systems */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-rose-100 text-rose-700 p-2 rounded-lg mr-3">
              <UserCircle className="w-5 h-5" />
            </span>
            ระบบฐานข้อมูลองค์กร (Organization Databases)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Doctors Card */}
            <Link href="doctors" className="group block bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-rose-200 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 transform group-hover:scale-110 transition-transform duration-500">
                <UserCircle className="w-32 h-32 text-rose-600" />
              </div>
              <div className="relative z-10">
                <div className="bg-rose-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                  <UserCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">ทำเนียบแพทย์ทั้งหมด</h3>
                <p className="text-gray-500 text-sm mb-6 h-10">เพิ่ม/ลด แก้ไขรายชื่อ ประวัติ และความเชี่ยวชาญของบุคลากรแพทย์</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="text-sm font-semibold text-rose-600 group-hover:underline">จัดการแพทย์ &rarr;</span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{doctorCount} ท่าน</span>
                </div>
              </div>
            </Link>

            {/* ITA Card */}
            <Link href="ita" className="group block bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 transform group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-32 h-32 text-teal-600" />
              </div>
              <div className="relative z-10">
                <div className="bg-teal-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">ศูนย์ข้อมูล ITA</h3>
                <p className="text-gray-500 text-sm mb-6 h-10">อัปโหลดและจัดการเอกสารประเมินคุณธรรมและความโปร่งใส (ITA)</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="text-sm font-semibold text-teal-600 group-hover:underline">จัดการเอกสาร &rarr;</span>
                </div>
              </div>
            </Link>

          </div>
        </section>

      </div>
    </div>
  );
}
