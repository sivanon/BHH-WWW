import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import { LayoutDashboard, FileText, ShieldPlus, UserCircle, Plus, Edit2, Trash2, MessageSquareWarning, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { createNews, deleteNews } from "@/app/actions/news";

export default async function NewsManager() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/th/admin/login");

  const newsList = await prisma.news.findMany({ orderBy: { date: 'desc' } });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shadow-sm z-10">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3 text-primary">
          <ShieldPlus className="h-8 w-8 text-secondary" />
          <span className="text-xl font-bold tracking-tight text-gray-900">Admin CMS</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <Link href="/th/admin" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link href="/th/admin/news" className="flex items-center px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold transition-colors">
            <FileText className="w-5 h-5 mr-3" /> จัดการข่าวสาร (News)
          </Link>
          <Link href="/th/admin/articles" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <BookOpen className="w-5 h-5 mr-3" /> บทความสุขภาพ
          </Link>
          <Link href="/th/admin/doctors" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <UserCircle className="w-5 h-5 mr-3" /> บริหารบุคลากร (Doctors)
          </Link>


        </nav>
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-500 mb-3 px-4 font-medium uppercase tracking-wider">บัญชีผู้ใช้</p>
          <p className="text-sm font-bold text-gray-800 px-4 mb-4 truncate">{session.user?.email}</p>
          <LogoutButton />
        </div>
      </div>
      
      <div className="flex-1 p-10 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">จัดการข่าวสารและประกาศ</h1>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-800 flex items-center"><Plus className="w-5 h-5 mr-2 text-primary" /> เพิ่มข่าวใหม่ (Create News)</h2>
            </div>
            <form action={createNews} encType="multipart/form-data" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">หัวข้อข่าว (Title)</label>
                  <input type="text" name="title" required className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-primary focus:border-primary" placeholder="เช่น รับสมัครพยาบาลด่วน..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">หมวดหมู่</label>
                  <select name="category" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary text-gray-900">
                    <option value="pr">ข่าวประชาสัมพันธ์ (PR)</option>
                    <option value="job">รับสมัครงาน (Jobs)</option>
                    <option value="procurement">จัดซื้อ-จัดจ้าง (Procurement)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">รูปภาพปก (Image)</label>
                  <input type="file" name="image" accept="image/*" className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-primary focus:border-primary bg-white" />
                  <p className="text-xs text-gray-400 mt-1">ไฟล์รูปภาพ (JPG, PNG, WEBP)</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">ไฟล์แนบ (PDF)</label>
                  <input type="file" name="attachment" accept=".pdf,.doc,.docx" className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-primary focus:border-primary bg-white" />
                  <p className="text-xs text-gray-400 mt-1">ไฟล์เอกสารประกาศจัดซื้อ/รับสมัครงาน</p>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">รายละเอียดเพิ่มเติม (Content)</label>
                <textarea name="content" rows={3} className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-primary focus:border-primary" placeholder="รายละเอียดประกาศ..."></textarea>
              </div>
              <button type="submit" className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition shadow-sm">
                บันทึกประกาศ
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-bold border-b border-gray-200">วันที่</th>
                  <th className="p-4 font-bold border-b border-gray-200">หมวดหมู่</th>
                  <th className="p-4 font-bold border-b border-gray-200">หัวข้อข่าว</th>
                  <th className="p-4 font-bold border-b border-gray-200 text-right">แอคชั่น</th>
                </tr>
              </thead>
              <tbody>
                {newsList.length === 0 && (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-500">ยังไม่มีข้อมูลข่าวสารในระบบ</td></tr>
                )}
                {newsList.map(news => (
                  <tr key={news.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-4 whitespace-nowrap text-sm text-gray-500">{news.date.toLocaleDateString('th-TH')}</td>
                    <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          news.category === 'pr' ? 'bg-blue-100 text-blue-700' :
                          news.category === 'lab' ? 'bg-purple-100 text-purple-700' :
                          news.category === 'job' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {news.category === 'pr' ? 'ข่าวประชาสัมพันธ์' :
                           news.category === 'lab' ? 'Smart LAB' :
                           news.category === 'job' ? 'รับสมัครงาน' :
                           'จัดซื้อ-จัดจ้าง'}
                        </span>
                      </td>
                    <td className="p-4 font-medium text-gray-900">{news.title}</td>
                    <td className="p-4 text-right">
                      <form action={async () => { "use server"; await deleteNews(news.id); }}>
                        <button type="submit" className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition" title="ลบข้อมูล">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
