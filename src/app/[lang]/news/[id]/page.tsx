import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText, Download, Tag } from "lucide-react";

export default async function PublicNewsDetailPage(props: { params: Promise<{ lang: string; id: string }> }) {
  const params = await props.params;
  const { lang, id } = params;

  const newsItem = await prisma.news.findUnique({
    where: { id: id },
  });

  if (!newsItem) {
    notFound();
  }

  const getCategoryName = (cat: string) => {
    switch (cat) {
      case "pr": return "ข่าวประชาสัมพันธ์";
      case "procurement": return "ข่าวจัดซื้อจัดจ้าง";
      case "procure": return "ข่าวจัดซื้อจัดจ้าง";
      case "job": return "รับสมัครงาน";
      default: return "ประกาศทั่วไป";
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "pr": return "bg-blue-100 text-blue-800 border-blue-200";
      case "procurement": 
      case "procure": return "bg-orange-100 text-orange-800 border-orange-200";
      case "job": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link href={`/${lang}/news`} className="inline-flex items-center text-secondary hover:text-primary font-bold transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> กลับไปหน้าข่าวสารทั้งหมด
          </Link>
        </div>

        {/* Main Content Box */}
        <article className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Header Area */}
          <div className="p-8 md:p-10 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getCategoryColor(newsItem.category)} flex items-center`}>
                <Tag className="w-4 h-4 mr-1.5" />
                {getCategoryName(newsItem.category)}
              </span>
              <span className="flex items-center text-sm font-medium text-gray-500">
                <Calendar className="w-4 h-4 mr-1.5" />
                {new Date(newsItem.date).toLocaleDateString('th-TH', { 
                  year: 'numeric', month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })} น.
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              {newsItem.title}
            </h1>
          </div>

          {/* Image Area if exists */}
          {newsItem.imageUrl && (
            <div className="w-full relative h-[400px] md:h-[500px] bg-gray-100 border-b border-gray-100">
              <Image 
                src={newsItem.imageUrl} 
                alt={newsItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}

          {/* Text Content */}
          {newsItem.content && (
            <div className="p-8 md:p-10">
              <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                {newsItem.content}
              </div>
            </div>
          )}

          {/* Download Attachment Box */}
          {newsItem.attachmentUrl && (
            <div className="p-8 md:p-10 bg-blue-50/50 border-t border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" /> เอกสารแนบ (คลิกเพื่อดาวน์โหลด / อ่าน)
              </h3>
              <a 
                href={newsItem.attachmentUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full md:w-auto px-6 py-4 bg-white border border-blue-200 rounded-xl hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="flex flex-col mr-8">
                  <span className="font-bold text-gray-800 group-hover:text-primary transition-colors">เอกสารประกาศอย่างเป็นทางการ</span>
                  <span className="text-xs text-gray-500 mt-1">PDF Document / Image</span>
                </div>
                <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Download className="w-5 h-5" />
                </div>
              </a>
            </div>
          )}

          {/* Fallback Empty State if nothing but title exists */}
          {!newsItem.content && !newsItem.imageUrl && !newsItem.attachmentUrl && (
            <div className="p-8 md:p-10 text-center bg-gray-50">
              <div className="w-16 h-16 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">ไม่มีรายละเอียดเพิ่มเติม</h3>
              <p className="text-gray-500 mt-2">ประกาศฉบับนี้มีเฉพาะหัวข้อข่าวเท่านั้น</p>
            </div>
          )}
        </article>

      </div>
    </div>
  );
}
