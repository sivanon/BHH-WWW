import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Calendar, ArrowLeft } from "lucide-react";

export default async function ArticleReadPage({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const id = resolvedParams.id;
  
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) return <div className="p-20 text-center">เนื้อหานี้ถูกลบไปแล้ว</div>;

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
            
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href={`/${lang}/articles`} className="inline-flex items-center text-gray-500 hover:text-primary mb-8 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> กลับไปหน้าบทความทั้งหมด
          </Link>

          <header className="mb-10 text-center md:text-left">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              <BookOpen className="w-4 h-4 mr-2" /> {article.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex items-center justify-center md:justify-start text-sm text-gray-500 font-medium border-t border-b border-gray-100 py-4">
              <Calendar className="w-5 h-5 mr-2" /> 
              เผยแพร่เมื่อ: {article.createdAt.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </header>

          {article.imageUrl && (
            <div className="rounded-3xl overflow-hidden mb-12 shadow-md">
              <img src={article.imageUrl} alt={article.title} className="w-full h-auto aspect-video object-cover" />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-800 leading-loose prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-primary hover:prose-a:text-primary/80">
            {article.content.split('\n').map((paragraph, i) => (
              paragraph.trim() ? <p key={i} className="mb-6">{paragraph}</p> : null
            ))}
          </div>
        </div>
      </main>

          </div>
  );
}
