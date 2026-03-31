import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

export default async function ArticlesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang;
  const articles = await prisma.article.findMany({ 
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="bg-gray-50 min-h-screen py-16 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm mb-4">บทความสุขภาพ</h1>
          <p className="text-xl text-gray-600">สาระน่ารู้ คู่มือดูแลสุขภาพ โดยทีมแพทย์และผู้เชี่ยวชาญจากโรงพยาบาลบ้านโฮ่ง</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <div key={article.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden group flex flex-col">
              <div className="aspect-[16/9] relative bg-gray-200 overflow-hidden">
                {article.imageUrl ? (
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                    <BookOpen className="w-16 h-16 text-primary/30" />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                  {article.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-gray-500 mb-3 font-medium">
                  <Calendar className="w-4 h-4 mr-1" /> {article.createdAt.toLocaleDateString('th-TH')}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow leading-relaxed">{article.content}</p>
                <Link href={`/${lang}/articles/${article.id}`} className="inline-flex items-center text-primary font-bold hover:underline group/link">
                  อ่านต่อ <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
          
          {articles.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-500">ยังไม่มีบทความในขณะนี้</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
