import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, FileText, UserCircle, AlertCircle, ArrowRight } from "lucide-react";

export default async function SearchResultsPage(props: { params: Promise<{ lang: string }>, searchParams: Promise<{ q?: string }> }) {
  const { lang } = await props.params;
  const { q } = await props.searchParams;
  
  const query = q || "";
  
  // Search News directly from DB using Prisma string matching
  const newsResults = query ? await prisma.news.findMany({
    where: { 
      published: true,
      OR: [
        { title: { contains: query } },
        { content: { contains: query } }
      ]
    },
    take: 10
  }) : [];

  // Search Doctors from DB
  const doctorResults = query ? await prisma.doctor.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { specialty: { contains: query } }
      ]
    },
    take: 5
  }) : [];

  const totalResults = newsResults.length + doctorResults.length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 flex items-center justify-center md:justify-start">
            <Search className="w-8 h-8 text-primary mr-3" /> ผลการค้นหา
          </h1>
          {query ? (
             <p className="text-xl text-gray-600">พบ <strong>{totalResults}</strong> รายการสำหรับเว็บไซต์ <span className="bg-yellow-100 px-2 font-bold break-all">"{query}"</span></p>
          ) : (
             <p className="text-xl text-gray-600">กรุณาพิมพ์คำค้นหาที่คุณต้องการ</p>
          )}
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 mb-12 transform hover:scale-[1.01] transition-transform">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input type="text" name="q" defaultValue={query} placeholder="ค้นหาข้อมูลอื่นๆ พิมพ์หัวข้อที่นี่..." className="w-full pl-14 pr-5 py-5 rounded-xl border-2 border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary text-gray-900 bg-blue-50/50 text-lg transition-all" required />
            </div>
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-5 rounded-xl transition-all shadow-md text-lg">
              ค้นหาข้อมูล
            </button>
          </form>
        </div>

        {query && totalResults === 0 && (
          <div className="bg-red-50 text-red-700 p-12 rounded-3xl flex items-center justify-center flex-col text-center border border-red-100 shadow-inner">
            <AlertCircle className="w-16 h-16 mb-4 text-red-300" />
            <h3 className="text-2xl font-bold mb-3">ไม่พบข้อมูลที่ตรงกับคำค้นหา</h3>
            <p className="text-red-700/80 text-lg">กรุณาลองใช้คำค้นหาที่สั้นลง หรือใช้คำอื่น เช่น "รับสมัครงาน" หรือตรวจสอบตัวสะกดอีกครั้ง</p>
          </div>
        )}

        <div className="space-y-12">
          {doctorResults.length > 0 && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-primary pl-4 mb-6">บุคลากรแพทย์ที่เกี่ยวข้อง</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {doctorResults.map(doc => (
                  <Link href={`/${lang}/doctors`} key={doc.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all flex items-center group">
                    <div className="bg-blue-50 p-4 rounded-full text-primary mr-5 group-hover:bg-primary group-hover:text-white transition-colors">
                      <UserCircle className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary transition-colors">{doc.name}</h3>
                      <p className="text-gray-500 mt-1">{doc.specialty}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {newsResults.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-secondary pl-4 mb-6">ข่าวสารและประกาศที่เกี่ยวข้อง</h2>
              <div className="space-y-5">
                {newsResults.map(news => (
                  <Link href={`/${lang}`} key={news.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-secondary hover:shadow-lg transition-all flex items-start group">
                    <div className="bg-orange-50 p-4 rounded-2xl text-secondary mr-6 flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl md:text-2xl text-gray-900 mb-3 group-hover:text-secondary transition-colors line-clamp-2">{news.title}</h3>
                      <div className="flex items-center gap-3 mb-3">
                         <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-bold uppercase tracking-wider">
                           {news.category === 'pr' ? 'ข่าวประชาสัมพันธ์' : news.category === 'job' ? 'รับสมัครงาน' : 'จัดซื้อจัดจ้าง'}
                         </span>
                         <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded border border-gray-100">{news.date.toLocaleDateString('th-TH')}</span>
                      </div>
                      <p className="text-gray-500 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors">{news.content || 'ดูรายละเอียดข่าวสารเพิ่มเติม (ไม่มีเนื้อหาสรุปย่อ)'}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
