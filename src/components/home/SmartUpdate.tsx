import { News } from "@prisma/client";
import { ChevronRight, Megaphone, Beaker, UserPlus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SmartUpdateProps {
  news: News[];
}

export default function SmartUpdate({ news }: SmartUpdateProps) {
  const categories = [
    { id: 'pr', label: 'ข่าวประชาสัมพันธ์', icon: Megaphone, color: 'text-blue-600', borderColor: 'border-blue-600' },
    { id: 'job', label: 'รับสมัครงาน', icon: UserPlus, color: 'text-green-600', borderColor: 'border-green-600' },
    { id: 'procurement', label: 'จัดซื้อ-จัดจ้าง', icon: ShoppingBag, color: 'text-orange-600', borderColor: 'border-orange-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => {
        const catNews = news.filter(n => n.category === cat.id).slice(0, 5);
        return (
          <div key={cat.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
            <div className={`p-4 border-b-4 ${cat.borderColor} bg-gray-50/50 flex items-center`}>
              <cat.icon className={`w-5 h-5 ${cat.color} mr-2`} />
              <h3 className="font-bold text-gray-900">{cat.label}</h3>
            </div>
            
            <div className="p-4 flex-grow">
              {catNews.length === 0 ? (
                <p className="text-gray-400 text-sm italic py-4">ไม่มีข้อมูลล่าสุด</p>
              ) : (
                <ul className="space-y-4">
                  {catNews.map((item, index) => {
                    const isFirstRowHasImage = index === 0 && item.imageUrl;
                    return (
                      <li key={item.id} className="group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <Link 
                          href={`/th/news/${item.id}`} 
                          className={`flex ${isFirstRowHasImage ? 'flex-col gap-3' : 'gap-4 items-start'} group-hover:bg-gray-50/50 p-2 -m-2 rounded-xl transition-all duration-300`}
                        >
                          {item.imageUrl && (
                            <div className={`relative shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm ${
                              isFirstRowHasImage 
                                ? 'w-full aspect-[16/9] mb-1' // Big Hero Image for first item
                                : 'w-24 h-20 md:w-28 md:h-20' // Larger Thumbnail for other items
                            }`}>
                              <Image 
                                src={item.imageUrl} 
                                alt={item.title} 
                                fill 
                                className="object-cover transition-transform duration-500 group-hover:scale-110" 
                              />
                            </div>
                          )}
                          <div className={`flex-1 min-w-0 ${isFirstRowHasImage ? 'pt-1' : 'pt-0.5'}`}>
                            <span className={`${isFirstRowHasImage ? 'text-lg md:text-xl font-extrabold line-clamp-2' : 'text-sm md:text-base font-bold line-clamp-2'} text-gray-800 group-hover:text-primary transition-colors block mb-2 leading-snug`}>
                              {item.title}
                            </span>
                            <div className="flex items-center text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                              {new Date(item.date).toLocaleDateString('th-TH', { day: 'numeric', short: 'short', year: 'numeric' })}
                              <ChevronRight className="w-3.5 h-3.5 ml-1 text-primary group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            
            <div className="p-4 bg-gray-50/30 border-t border-gray-50">
              <Link 
                href={`/th/news?cat=${cat.id}`} 
                className="text-xs font-bold text-primary flex items-center justify-end hover:underline"
              >
                ดูพั้งหมด <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
