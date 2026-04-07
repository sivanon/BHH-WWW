import { prisma } from '@/lib/prisma';
import { getDictionary, Locale } from '@/i18n/dictionaries';
import Link from 'next/link';
import { Search, FileText, User, File, ArrowRight, ShieldCheck } from 'lucide-react';

export default async function SearchPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ lang: string }>,
  searchParams: Promise<{ q?: string }>
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const q = (await searchParams).q || "";
  
  if (!q) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center bg-gray-50">
        <Search className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">ค้นหาข้อมูล</h1>
        <p className="text-gray-500">กรุณาระบุคำค้นหาบนหน้าแรกเพื่อเริ่มค้นหา</p>
      </div>
    );
  }

  // Parallel fetches across multiple modules
  const [news, articles, doctors, pages, itas] = await Promise.all([
    prisma.news.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { content: { contains: q, mode: 'insensitive' } }
        ]
      },
      take: 10
    }),
    prisma.article.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { content: { contains: q, mode: 'insensitive' } }
        ]
      },
      take: 10
    }),
    prisma.doctor.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { specialty: { contains: q, mode: 'insensitive' } }
        ]
      },
      take: 10
    }),
    prisma.pageContent.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { content: { contains: q, mode: 'insensitive' } }
        ]
      },
      take: 10
    }),
    prisma.oitDocument.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { oitCode: { contains: q, mode: 'insensitive' } }
        ]
      },
      take: 10
    })
  ]);

  // Aggregate and format to standard array
  type SearchResult = {
    id: string;
    title: string;
    type: string;
    url: string;
    excerpt: string;
    icon: any;
    isExternal?: boolean;
  };

  const results: SearchResult[] = [
    ...news.map(item => ({
      id: `news-${item.id}`,
      title: item.title,
      type: 'ข่าวสาร (News)',
      url: `/${lang}/news/${item.id}`,
      excerpt: item.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...',
      icon: FileText
    })),
    ...articles.map(item => ({
      id: `article-${item.id}`,
      title: item.title,
      type: 'บทความสุขภาพ (Article)',
      url: `/${lang}/articles/${item.id}`,
      excerpt: item.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...',
      icon: FileText
    })),
    ...pages.map(item => ({
      id: `page-${item.id}`,
      title: item.title,
      type: 'หน้าข้อมูล (Page)',
      url: `/${lang}/${item.slug}`,
      excerpt: item.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...',
      icon: File
    })),
    ...doctors.map(item => ({
      id: `doc-${item.id}`,
      title: item.name,
      type: 'ข้อมูลแพทย์ (Doctor)',
      url: `/${lang}/doctors`,
      excerpt: `แพทย์ผู้เชี่ยวชาญด้าน ${item.specialty} ประจำคลินิก/แผนก ${item.location}`,
      icon: User
    })),
    ...itas.map(item => ({
      id: `ita-${item.id}`,
      title: item.name,
      type: 'เอกสาร ITA (Document)',
      url: `/api/pdf/${item.id}`,
      excerpt: `รหัสอ้างอิง: ${item.oitCode} | คลิกเพื่อเปิดดูเอกสาร PDF`,
      icon: ShieldCheck,
      isExternal: true
    }))
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Search Input Bar */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          <form method="GET" action={`/${lang}/search`} className="relative flex flex-col md:flex-row shadow-md rounded-2xl overflow-hidden">
            <input 
              type="text" 
              name="q"
              defaultValue={q}
              required
              placeholder="ค้นหาข้อมูลจากระบบส่วนกลาง..."
              className="flex-grow bg-gray-50 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary border-0"
            />
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 transition-colors flex justify-center items-center">
              <Search className="w-5 h-5 mr-2" /> ค้นหาใหม่
            </button>
          </form>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
          <Search className="w-8 h-8 mr-3 text-secondary hidden md:block" />
          ผลการค้นหาสำหรับ "{q}"
          <span className="ml-4 text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{results.length} รายการ</span>
        </h1>

        {results.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">ไม่พบข้อมูลที่คุณค้นหา</h3>
            <p className="text-gray-500">โปรดลองใช้คำค้นหาอื่นที่สั้นลง หรือใช้คำที่มีความหมายกว้างขึ้น</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map(result => {
              const ResultCard = (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 h-full">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary md:mr-5 mr-4 mt-1 group-hover:bg-primary group-hover:text-white transition-colors">
                      <result.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs md:text-sm font-bold text-secondary mb-1 uppercase tracking-wide">{result.type}</div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">{result.title}</h3>
                      <p className="text-gray-600 line-clamp-2 md:line-clamp-3 leading-relaxed text-sm md:text-base">{result.excerpt}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary mt-6 transform group-hover:translate-x-1 transition-all hidden md:block" />
                  </div>
                </div>
              );

              return result.isExternal ? (
                <a href={result.url} target="_blank" key={result.id} className="block group">
                  {ResultCard}
                </a>
              ) : (
                <Link href={result.url} key={result.id} className="block group">
                  {ResultCard}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
