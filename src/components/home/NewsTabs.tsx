"use client";

import { useState } from "react";
import { ChevronRight, Paperclip, Image as ImageIcon } from "lucide-react";
import { News } from "@prisma/client";

export default function NewsTabs({ initialNews }: { initialNews: News[] }) {
  const [activeTab, setActiveTab] = useState("pr");

  const tabs = [
    { id: "pr", label: "ข่าวประชาสัมพันธ์" },
    { id: "procure", label: "ข่าวจัดซื้อจัดจ้าง" },
    { id: "job", label: "รับสมัครงาน" },
  ];

  const filteredNews = initialNews.filter(n => n.category === activeTab);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
      <div className="flex border-b border-gray-200 bg-gray-50 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 px-2 text-sm md:text-base font-bold text-center border-b-2 transition-all ${activeTab === tab.id ? 'border-primary text-primary bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6">
        <ul className="space-y-4">
          {filteredNews.length === 0 && <p className="text-gray-500 text-center py-4 font-medium">ยังไม่มีประกาศในหมวดหมู่นี้</p>}
          {filteredNews.map((item) => (
            <li key={item.id} className="flex items-start group mb-4">
              <ChevronRight className="w-5 h-5 text-secondary mr-2 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              <div className="min-w-0 flex-1">
                <a href={item.attachmentUrl || item.imageUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-800 font-medium hover:text-primary transition-colors line-clamp-2 block">
                  {item.title}
                </a>
                <div className="flex items-center space-x-3 mt-1.5">
                  <span className="text-gray-400 text-xs font-medium bg-gray-100 px-2 py-0.5 rounded">{new Date(item.date).toLocaleDateString('th-TH')}</span>
                  {item.attachmentUrl && (
                    <span className="flex items-center text-xs text-blue-600 font-medium"><Paperclip className="w-3 h-3 mr-1"/> PDF</span>
                  )}
                  {item.imageUrl && (
                    <span className="flex items-center text-xs text-green-600 font-medium"><ImageIcon className="w-3 h-3 mr-1"/> Image</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-right">
          <a href="#" className="text-primary text-sm font-bold hover:underline">ดูทั้งหมด &rarr;</a>
        </div>
      </div>
    </div>
  );
}
