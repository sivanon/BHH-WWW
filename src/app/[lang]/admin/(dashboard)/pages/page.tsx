import { prisma } from "@/lib/prisma";
import { ShieldPlus, LayoutDashboard, FileText, BookOpen, UserCircle, ShieldCheck, PenTool, Save } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import { updatePageContent } from "@/app/actions/pages";

const SLUGS = [
  { id: "executives", name: "ผู้บริหารหน่วยงาน", url: "/about/executives" },
  { id: "policies", name: "นโยบายและยุทธศาสตร์", url: "/about/policies" },
  { id: "vision", name: "วิสัยทัศน์ พันธกิจ", url: "/about/vision" },
  { id: "structure", name: "โครงสร้างหน่วยงาน", url: "/about/structure" },
  { id: "pdpa", name: "PDPA (ข้อมูลส่วนบุคคล)", url: "/about/pdpa" },
  { id: "projects", name: "แผนงานและโครงการ", url: "/projects" }
];

export default async function AdminPagesCMS(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const pages = await prisma.pageContent.findMany();

  // Map entries for direct lookup by slug O(1)
  const contentMap = pages.reduce((acc, curr) => {
    acc[curr.slug] = curr;
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shadow-sm z-10 shrink-0">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3 text-primary">
          <ShieldPlus className="h-8 w-8 text-secondary" />
          <span className="text-xl font-bold tracking-tight text-gray-900">Admin CMS</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <Link href={`/${lang}/admin`} className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link href={`/${lang}/admin/news`} className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <FileText className="w-5 h-5 mr-3" /> จัดการข่าวสาร
          </Link>
          <Link href={`/${lang}/admin/articles`} className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <BookOpen className="w-5 h-5 mr-3" /> บทความสุขภาพ
          </Link>
          <Link href={`/${lang}/admin/pages`} className="flex items-center px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold transition-colors">
            <PenTool className="w-5 h-5 mr-3" /> จัดการหน้าองค์กร (Static)
          </Link>
          <Link href={`/${lang}/admin/doctors`} className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <UserCircle className="w-5 h-5 mr-3" /> บริหารบุคลากร
          </Link>
          <Link href={`/${lang}/admin/ita`} className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <ShieldCheck className="w-5 h-5 mr-3" /> จัดการเอกสาร ITA
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <LogoutButton />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center"><PenTool className="w-8 h-8 mr-3 text-primary" /> ระบบแก้ไขหน้าเว็บไซต์องค์กร (Page Content Management)</h1>
            <p className="text-gray-500 mt-2">คุณสามารถแก้ไขข้อความหัวข้อและรายละเอียดของหน้าต่างๆ ที่แต่ก่อนแก้ไขไม่ได้ (เช่น หน้าผู้บริหาร, วิสัยทัศน์) ผ่านระบบฐานข้อมูลนี้ได้เลย ระบบจะนำข้อมูลไปแสดงหน้าบ้ายอัตโนมัติ</p>
          </div>

          <div className="space-y-12">
            {SLUGS.map((slugDef) => {
              const existingData = contentMap[slugDef.id];
              return (
                <div key={slugDef.id} className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
                     <div>
                        <h2 className="text-xl font-bold text-gray-900">{slugDef.name}</h2>
                        <a href={`/${lang}${slugDef.url}`} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:underline font-bold">ดูหน้าเว็บจริง ({slugDef.url}) &nearr;</a>
                     </div>
                     <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${existingData ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`}>
                       • {existingData ? "มีข้อมูลบนเซิร์ฟเวอร์แล้ว" : "ยังใช้เนื้อหาแผ่นป้ายจำลอง"}
                     </span>
                  </div>
                  {/* @ts-expect-error Server Action Type Mismatch in Next.js 14 */}
                  <form action={updatePageContent} className="p-6 space-y-4">
                    <input type="hidden" name="slug" value={slugDef.id} />
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">หัวข้อหน้า (H1 Display Title)</label>
                      <input 
                        type="text" 
                        name="title" 
                        required 
                        defaultValue={existingData?.title || slugDef.name} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">เนื้อหาทั้งหมด (รองรับการขึ้นบรรทัดใหม่)</label>
                      <textarea 
                        name="content" 
                        required 
                        rows={8}
                        defaultValue={existingData?.content || ""} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 font-sans"
                        placeholder="พิมพ์เนื้อหาที่ต้องการแสดงบนหน้าเว็บได้ที่นี่..."
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-extrabold py-3 px-8 rounded-xl flex items-center transition-transform hover:-translate-y-1 shadow-md">
                        <Save className="w-5 h-5 mr-2" /> บันทึกเนื้อหา "{slugDef.name}" ลงฐานข้อมูล
                      </button>
                    </div>
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
