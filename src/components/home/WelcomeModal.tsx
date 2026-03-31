"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show once per session
    const hasSeen = sessionStorage.getItem("welcomeModalSeen");
    if (!hasSeen) {
      setIsOpen(true);
      sessionStorage.setItem("welcomeModalSeen", "true");
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative scale-100 animate-in zoom-in-95 duration-300">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        <div className="h-48 bg-primary relative">
          <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800" alt="Notice" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white shadow-sm drop-shadow-md">ประกาศด่วนจากโรงพยาบาล</h2>
          </div>
        </div>
        <div className="p-8 text-center space-y-4">
          <p className="text-gray-700 leading-relaxed font-medium">
            ยินดีต้อนรับเข้าสู่เว็บไซต์ของโรงพยาบาล โปรดสวมหน้ากากอนามัยทุกครั้งเมื่อเดินทางมารับบริการ เพื่อความปลอดภัยของท่านและส่วนรวม
          </p>
          <button 
            onClick={() => setIsOpen(false)}
            className="mt-6 w-full py-3 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 transition-all shadow-md"
          >
            รับทราบและเข้าสู่เว็บไซต์
          </button>
        </div>
      </div>
    </div>
  );
}
