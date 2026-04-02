import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronRight, Calendar, Newspaper, ArrowRight } from "lucide-react";

export default async function PublicNewsDirectory(props: { params: Promise<{ lang: string }>, searchParams: Promise<{ cat?: string }> }) {
  const { lang } = await props.params;
  const { cat } = await props.searchParams;

  const whereClause = cat ? { category: cat } : {};

  const allNews = await prisma.news.findMany({
    where: whereClause,
    orderBy: { date: 'desc' }
  });

  const CATEGORIES = [
    { id: "", name: "ข่าวสารทั้งหมด" },
    { id: "pr", name: "ประชาสัมพันธ์" },
    { id: "job", name: "รับสมัครงาน" },
    { id: "procurement", name: "จัดซื้อจัดจ้าง" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Header Area */}
      <div className="bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-primary font-bold text-sm mb-4 border border-blue-100">
                <Newspaper className="w-4 h-4 mr-2" /> ศูนย์บริหารข้อมูลข่าวสาร
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">ประกาศและข่าวสารศูนย์ รพ.</h1>
              <p className="text-gray-500 mt-4 text-lg max-w-2xl">อัปเดตข่าวสารการจัดซื้อจัดจ้าง ประกาศรับสมัครงาน และกิจกรรมต่างๆ ของโรงพยาบาลบ้านโฮ่ง</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <div className="lg:w-1/4 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <h3 className="font-extrabold text-gray-900 text-lg mb-6 flex items-center">
                หมวดหมู่ข่าวสาร
              </h3>
              <nav className="flex flex-col space-y-2">
                {CATEGORIES.map((c) => {
                  const isActive = (cat || "") === c.id;
                  return (
                    <Link
                      key={c.id}
                      href={`/${lang}/news${c.id ? `?cat=${c.id}` : ''}`}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-colors ${
                        isActive 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {c.name}
                      {isActive && <ChevronRight className="w-4 h-4" />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main List */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {cat ? CATEGORIES.find(c => c.id === cat)?.name : "รายการข่าวล่าสุด"}
                </h2>
                <span className="text-sm font-bold text-gray-500 bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
                  พบ {allNews.length} รายการ
                </span>
              </div>
              
              <div className="divide-y divide-gray-100">
                {allNews.length === 0 ? (
                  <div className="p-16 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Newspaper className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700">ยังไม่มีประกาศในหมวดหมู่นี้</h3>
                    <p className="text-gray-500 mt-2">โปรดกลับมาตรวจสอบใหม่ในภายหลัง</p>
                  </div>
                ) : (
                  allNews.map((news) => (
                    <Link 
                      key={news.id} 
                      href={`/${lang}/news/${news.id}`}
                      className="group flex flex-col md:flex-row p-6 md:p-8 hover:bg-slate-50 transition-colors duration-200"
                    >
                      <div className="md:w-56 shrink-0 mb-4 md:mb-0 md:mr-8 pt-1">
                         <div className={`inline-flex items-center text-sm font-bold text-secondary bg-orange-50 px-3 py-1.5 rounded-lg ${news.imageUrl ? 'mb-4' : ''}`}>
                           <Calendar className="w-4 h-4 mr-2" />
                           {new Date(news.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                         </div>
                         {news.imageUrl && (
                           <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                             <Image src={news.imageUrl} alt={news.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                           </div>
                         )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                          {news.title}
                        </h3>
                        {news.content && (
                          <p className="text-gray-500 line-clamp-3 leading-relaxed mb-4">
                            {news.content}
                          </p>
                        )}
                        <span className="inline-flex items-center text-primary font-bold text-sm mt-auto">
                          อ่านรายละเอียด <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
