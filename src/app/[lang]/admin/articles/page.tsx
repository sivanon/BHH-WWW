import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import { LayoutDashboard, FileText, ShieldPlus, UserCircle, Plus, Trash2, MessageSquareWarning, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { createArticle, deleteArticle } from "@/app/actions/articles";

export default async function AdminArticlesPage({ params }: { params: Promise<{ lang: string }> }) {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-center">
          <ShieldPlus className="h-10 w-10 text-primary mr-3" />
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">Admin<span className="text-secondary">CMS</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/th/admin" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" /> แดชบอร์ด
          </Link>
          <Link href="/th/admin/news" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <FileText className="w-5 h-5 mr-3" /> ข่าวและประกาศ
          </Link>
          <Link href="/th/admin/articles" className="flex items-center px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold transition-colors">
            <BookOpen className="w-5 h-5 mr-3" /> บทความสุขภาพ
          </Link>
          <Link href="/th/admin/doctors" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <UserCircle className="w-5 h-5 mr-3" /> บริหารบุคลากร (Doctors)
          </Link>

        </nav>
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-500 mb-3 px-4 font-medium uppercase tracking-wider">บัญชีผู้ใช้</p>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">ระบบจัดการบทความสุขภาพ</h1>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-10">
            <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800"><Plus className="mr-2 text-primary" /> เพิ่มบทความใหม่</h2>
            <form action={async (formData) => {
              "use server";
              const title = formData.get("title") as string;
              const content = formData.get("content") as string;
              const category = formData.get("category") as string;
              const imageUrl = formData.get("imageUrl") as string || undefined;
              
              if (title && content) {
                await createArticle({ title, content, category, imageUrl, published: true });
              }
            }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">หัวข้อบทความ</label>
                  <input type="text" name="title" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">หมวดหมู่</label>
                  <select name="category" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary text-gray-900">
                    <option value="Health">Health (สุขภาพทั่วไป)</option>
                    <option value="Nutrition">Nutrition (โภชนาการ)</option>
                    <option value="Childcare">Childcare (แม่และเด็ก)</option>
                    <option value="Elderly">Elderly (ผู้สูงอายุ)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ลิงก์รูปภาพหน้าปก (URL)</label>
                <input type="url" name="imageUrl" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary text-gray-900" placeholder="https://..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">เนื้อหาบทความ</label>
                <textarea name="content" required rows={10} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary text-gray-900" placeholder="พิมพ์เนื้อหาที่นี่..."></textarea>
              </div>

              <button type="submit" className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition shadow-sm">
                บันทึกและเผยแพร่
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                    <th className="p-4 font-bold">วันที่สร้าง</th>
                    <th className="p-4 font-bold">หมวดหมู่</th>
                    <th className="p-4 font-bold w-1/3">หัวข้อ</th>
                    <th className="p-4 font-bold text-center">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {articles.map(article => (
                    <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 text-sm text-gray-600">{article.createdAt.toLocaleDateString('th-TH')}</td>
                      <td className="p-4"><span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">{article.category}</span></td>
                      <td className="p-4 text-sm font-bold text-gray-900">{article.title}</td>
                      <td className="p-4 text-center">
                        <form action={async () => {
                          "use server";
                          await deleteArticle(article.id);
                        }}>
                          <button type="submit" className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="ลบ">
                            <Trash2 className="w-5 h-5 mx-auto" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                  {articles.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-gray-500">ยังไม่มีบทความในระบบ</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
