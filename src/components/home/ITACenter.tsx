import { Info } from "lucide-react";
import Link from "next/link";

export default function ITACenter() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group hover:shadow-blue-900/50 transition-all">
      <Link href="/th/ita" className="block relative z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-6 border-l-4 border-secondary pl-5">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">ศูนย์ข้อมูลข่าวสาร ITA โรงพยาบาลบ้านโฮ่ง</h2>
          </div>
          
          <p className="text-blue-100/90 mb-10 max-w-4xl text-lg leading-relaxed font-light">
            ศูนย์รวบรวมข้อมูลเพื่อความโปร่งใสและการบริหารงานที่ตรวจสอบได้ ตามประเมินคุณธรรมและความโปร่งใสในการดำเนินงานของหน่วยงานภาครัฐ (Integrity and Transparency Assessment) ประจำปี 2569
          </p>

          <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg px-8 py-4 rounded-2xl group-hover:bg-white/20 transition-all group-hover:translate-x-2">
            <Info className="w-6 h-6 mr-3 text-secondary" /> 
            เข้าสู่ศูนย์ข้อมูลและเอกสารเปิดเผยสาธารณะ (OIT) &rarr;
          </div>
        </div>
      </Link>
    </div>
  );
}
