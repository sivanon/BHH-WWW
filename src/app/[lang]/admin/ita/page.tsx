import { prisma } from "@/lib/prisma";
import { ShieldPlus, LayoutDashboard, FileText, BookOpen, UserCircle, ShieldCheck, Plus, FileBarChart } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import DeleteOitButton from "@/components/admin/DeleteOitButton";
import { addOitDocument } from "@/app/actions/ita";

export default async function AdminITAPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const documents = await prisma.oitDocument.findMany({
    orderBy: [
      { indicator: 'asc' },
      { oitCode: 'asc' }
    ]
  });

  const indicatorNames = [
    "ตัวชี้วัดที่ 1 การเปิดเผยข้อมูล",
    "ตัวชี้วัดที่ 2 การจัดซื้อจัดจ้างหรือการจัดหาพัสดุ",
    "ตัวชี้วัดที่ 3 การบริหารและพัฒนาทรัพยากรบุคคล",
    "ตัวชี้วัดที่ 4 การส่งเสริมความโปร่งใส",
    "ตัวชี้วัดที่ 5 การป้องกันการรับสินบน",
    "ตัวชี้วัดที่ 6 การป้องกันการใช้ทรัพย์สินของราชการ",
    "ตัวชี้วัดที่ 7 การดำเนินการเพื่อป้องกันการทุจริต",
    "ตัวชี้วัดที่ 8 การป้องกันผลประโยชน์ทับซ้อน",
    "ตัวชี้วัดที่ 9 การเสริมสร้างวัฒนธรรมองค์กร"
  ];

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
            <FileText className="w-5 h-5 mr-3" /> จัดการข่าวสาร (News)
          </Link>
          <Link href={`/${lang}/admin/articles`} className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <BookOpen className="w-5 h-5 mr-3" /> บทความสุขภาพ
          </Link>
          <Link href={`/${lang}/admin/doctors`} className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            <UserCircle className="w-5 h-5 mr-3" /> บริหารบุคลากร (Doctors)
          </Link>
          <Link href={`/${lang}/admin/ita`} className="flex items-center px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold transition-colors">
            <ShieldCheck className="w-5 h-5 mr-3" /> จัดการเอกสาร ITA
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <LogoutButton />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">จัดการหน้าศูนย์ข้อมูล ITA</h1>
                <p className="text-gray-500 mt-1">อัปโหลด ลบ หรือแก้ไขเอกสาร OIT (Open Data Integrity) ที่แสดงบนหน้าเว็บไซต์</p>
              </div>
            </div>
            <a href={`/${lang}/ita`} target="_blank" className="px-5 py-2.5 bg-gray-100 font-bold text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center">
              ดูหน้าเว็บไซต์จริง <span className="ml-2 text-xl">&rarr;</span>
            </a>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1 h-fit bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 sticky top-8">
              <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                <div className="bg-green-100 p-2 rounded-lg text-green-600 mr-3">
                  <Plus className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">อัปโหลดเอกสารใหม่</h2>
              </div>
              {/* @ts-expect-error Server Action Type Mismatch in Next.js 14 */}
              <form action={addOitDocument} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">หมวดหมู่ตัวชี้วัด</label>
                  <select name="indicator" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 text-gray-900 font-medium">
                    {indicatorNames.map((name, i) => (
                      <option key={i} value={i + 1}>{name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-3">
                    <label className="block text-sm font-bold text-gray-700 mb-2">รหัส EB / MOIT</label>
                    <input type="text" name="oitCode" required placeholder="เช่น MOIT1" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary font-mono uppercase bg-gray-50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">ชื่อเอกสาร / คำอธิบาย</label>
                  <input type="text" name="name" required placeholder="เช่น โครงสร้างหน่วยงาน หรือ แบบฟอร์มขออนุญาต" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">แนบไฟล์เอกสาร PDF</label>
                  <input type="file" name="file" accept=".pdf,application/pdf" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary bg-white text-gray-600 font-mono text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors" />
                </div>
                <button type="submit" className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-extrabold py-4 rounded-xl flex justify-center items-center text-lg transition-transform hover:-translate-y-1 shadow-md">
                  <FileBarChart className="w-5 h-5 mr-3" />
                  เผยแพร่ขึ้นหน้า ITA ทันที
                </button>
              </form>
            </div>

            <div className="xl:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-extrabold text-gray-900">ฐานข้อมูลเอกสาร ITA (ออนไลน์)</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">{documents.length} เอกสารในระบบ</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100/50 border-b border-gray-200 text-sm">
                        <th className="p-5 font-bold text-gray-600 w-1/4">ตัวชี้วัด</th>
                        <th className="p-5 font-bold text-gray-600">รหัส</th>
                        <th className="p-5 font-bold text-gray-600 w-1/2">ชื่อเอกสาร</th>
                        <th className="p-5 font-bold text-gray-600 text-center">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {documents.length === 0 ? (
                        <tr><td colSpan={4} className="p-12 text-center text-gray-500 font-bold">ไม่มีรายการเอกสารในระบบ โปรดเพิ่มด้านซ้ายมือ</td></tr>
                      ) : documents.map((doc) => (
                        <tr key={doc.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                          <td className="p-5">
                            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                              ตัวชี้วัดที่ {doc.indicator}
                            </span>
                          </td>
                          <td className="p-5">
                            <span className="font-mono font-extrabold text-secondary tracking-wider bg-orange-50 px-2 py-1 rounded-md">{doc.oitCode}</span>
                          </td>
                          <td className="p-5">
                            <a href={doc.url} target="_blank" className="font-bold text-gray-900 hover:text-primary transition-colors block line-clamp-2">
                              {doc.name}
                            </a>
                            <p className="text-xs text-gray-400 mt-1">{doc.url.substring(0,30)}...</p>
                          </td>
                          <td className="p-5 text-center">
                            <DeleteOitButton id={doc.id} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
