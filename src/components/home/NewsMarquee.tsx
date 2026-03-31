"use client";

import { AlertCircle } from "lucide-react";

export default function NewsMarquee() {
  return (
    <div className="bg-red-600 text-white flex items-center overflow-hidden h-10 border-b border-red-700">
      <div className="bg-red-700 h-full px-4 flex items-center font-bold whitespace-nowrap z-10 shadow-[4px_0_10px_rgba(0,0,0,0.2)]">
        <AlertCircle className="w-4 h-4 mr-2" />
        ข่าวด่วน (Breaking News)
      </div>
      <div className="relative flex-1 overflow-hidden flex items-center h-full">
        {/* Custom inline animation for marquee */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
          .animate-marquee { animation: marquee 20s linear infinite; }
        `}} />
        <div className="animate-marquee whitespace-nowrap font-medium text-sm pl-full">
          อัปเดตสถานการณ์สำคัญล่าสุด | งดเยี่ยมผู้ป่วยทุกกรณี เพื่อลดความแออัด | เปิดให้บริการคลินิกนอกเวลาราชการแล้ววันนี้ สามารถนัดหมายล่วงหน้าได้
        </div>
      </div>
    </div>
  );
}
