import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import { LayoutDashboard, FileText, ShieldPlus, UserCircle, MessageSquareWarning, BookOpen, ShieldCheck, PenTool } from "lucide-react";
import { prisma } from "@/lib/prisma";
import AnalyticsChart from "@/components/admin/AnalyticsChart";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/th/admin/login");
  }

  const newsCount = await prisma.news.count();
  const doctorCount = await prisma.doctor.count();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shadow-sm z-10">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3 text-primary">
          <ShieldPlus className="h-8 w-8 text-secondary" />
          <span className="text-xl font-bold tracking-tight text-gray-900">Admin CMS</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <Link href="/th/admin" className="flex items-center px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link href="/th/admin/news" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <FileText className="w-5 h-5 mr-3" /> จัดการข่าวสาร (News)
          </Link>
          <Link href="/th/admin/articles" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <BookOpen className="w-5 h-5 mr-3" /> บทความสุขภาพ
          </Link>
          <Link href="/th/admin/doctors" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <UserCircle className="w-5 h-5 mr-3" /> บริหารบุคลากร (Doctors)
          </Link>
          <Link href="/th/admin/pages" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <PenTool className="w-5 h-5 mr-3" /> จัดการหน้าองค์กร (CMS)
          </Link>
          <Link href="/th/admin/ita" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <ShieldCheck className="w-5 h-5 mr-3" /> จัดการเอกสาร ITA
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-500 mb-3 px-4 font-medium uppercase tracking-wider">บัญชีผู้ใช้</p>
          <p className="text-sm font-bold text-gray-800 px-4 mb-4 truncate">{session.user?.email}</p>
          <LogoutButton />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-10 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">ภาพรวมระบบ (Dashboard Overview)</h1>
          <p className="text-gray-500 mb-8">ยินดีต้อนรับเข้าสู่ระบบจัดการข้อมูลเว็บไซต์โรงพยาบาล</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wide">ข่าวสารทั้งหมดในระบบ</h3>
              <p className="text-4xl font-extrabold mt-3 text-primary">{newsCount}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/th/admin/news" className="text-sm text-secondary font-bold hover:underline">จัดการข่าวสาร &rarr;</Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wide">บุคลากรแพทย์</h3>
              <p className="text-4xl font-extrabold mt-3 text-green-600">{doctorCount}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/th/admin/doctors" className="text-sm text-secondary font-bold hover:underline">จัดการแพทย์ &rarr;</Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wide">ศูนย์ข้อมูล ITA (OIT)</h3>
              <p className="text-4xl font-extrabold mt-3 text-secondary"><ShieldCheck className="w-10 h-10 inline-block -mt-2" /></p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/th/admin/ita" className="text-sm text-secondary font-bold hover:underline">จัดการเอกสาร &rarr;</Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer transition-transform hover:-translate-y-1">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wide">จัดการหน้าองค์กร (CMS)</h3>
              <p className="text-4xl font-extrabold mt-3 text-purple-500"><PenTool className="w-10 h-10 inline-block -mt-2" /></p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/th/admin/pages" className="text-sm text-purple-600 font-bold hover:underline">แก้ไขหน้าเว็บคงที่ &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
