import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OITTableDisplay from "@/components/ita/OITTableDisplay";
import { ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function ITAPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang;

  // Retrieve Dynamic List from Database
  const rawDocs = await prisma.oitDocument.findMany({
    orderBy: [
      { indicator: 'asc' },
      { oitCode: 'asc' }
    ]
  });

  const indicatorTitles = [
    "ตัวชี้วัดที่ 1 การเปิดเผยข้อมูล",
    "ตัวชี้วัดที่ 2 การจัดซื้อจัดจ้างหรือการจัดหาพัสดุ",
    "ตัวชี้วัดที่ 3 การบริหารและพัฒนาทรัพยากรบุคคล",
    "ตัวชี้วัดที่ 4 การส่งเสริมความโปร่งใส",
    "ตัวชี้วัดที่ 5 การป้องกันการรับสินบน",
    "ตัวชี้วัดที่ 6 การป้องกันการใช้ทรัพย์สินของราชการ",
    "ตัวชี้วัดที่ 7 การดำเนินการเพื่อป้องกันการทุจริต",
    "ตัวชี้วัดที่ 8 การป้องกันผลประโยชน์ทับซ้อน",
    "ตัวชี้วัดที่ 9 การเสริมสร้างวัฒนธรรมองค์กร"
  ];

  const descriptions = [
    "ข้อมูลพื้นฐาน การบริหารงาน และการบริหารเงินงบประมาณ",
    "แผนการจัดซื้อจัดจ้างและรายงานผลการจัดหาพัสดุประจำปี",
    "นโยบายและผลการบริหารและพัฒนาทรัพยากรบุคคล",
    "การจัดการเรื่องร้องเรียนและการเปิดโอกาสให้มีส่วนร่วม",
    "มาตรการและนโยบายในการป้องกันการรับสินบน",
    "แนวปฏิบัติและมาตรการป้องกันการใช้ทรัพย์สินของราชการ",
    "แผนปฏิบัติการและรายงานผลการดำเนินการป้องกันการทุจริต",
    "การจัดการความเสี่ยงและมาตรการป้องกันผลประโยชน์ทับซ้อน",
    "การส่งเสริมจริยธรรมและแบบธรรมเนียมของหน่วยงาน"
  ];

  // Group fetched database documents artificially into the 9 Accordion slots
  const oitData = indicatorTitles.map((title, index) => {
    const indicatorId = index + 1;
    return {
      title,
      description: descriptions[index],
      documents: rawDocs.filter(d => d.indicator === indicatorId).map(d => ({
        name: `${d.oitCode} ${d.name}`,
        url: d.url,
        size: d.size
      }))
    };
  });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <main className="flex-grow">
        {/* MTH Clone Premium Banner */}
        <div className="bg-gradient-to-br from-primary via-blue-800 to-gray-900 pt-28 pb-40 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             <div className="absolute -top-32 -right-32 w-full max-w-2xl h-full max-h-2xl bg-white/5 rounded-full blur-3xl"></div>
             <div className="absolute top-1/2 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
             {/* Abstract Grid Pattern overlay */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center justify-center p-5 bg-white/10 rounded-3xl backdrop-blur-xl mb-8 border border-white/20 shadow-2xl">
               <ShieldCheck className="w-16 h-16 text-secondary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-xl">ศูนย์ข้อมูลข่าวสาร ITA<br/><span className="text-3xl md:text-4xl mt-4 block text-blue-200">โรงพยาบาลบ้านโฮ่ง</span></h1>
            <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto font-medium leading-relaxed drop-shadow-md">
              Integrity and Transparency Assessment (ITA)<br/>
              <span className="text-lg font-light mt-2 block">การประเมินคุณธรรมและความโปร่งใสในการดำเนินงานของหน่วยงานภาครัฐ ประจำปีงบประมาณ พ.ศ. 2569</span>
            </p>
          </div>
        </div>

        {/* Dynamic Table Flow Content Wrapper */}
        <div className="container mx-auto px-4 -mt-28 relative z-20 pb-32">
          <div className="max-w-7xl mx-auto">
             {rawDocs.length === 0 ? (
               <div className="bg-white rounded-3xl p-16 text-center shadow-xl border border-gray-100">
                 <ShieldCheck className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                 <h3 className="text-3xl font-extrabold text-gray-800 mb-2">รอการนำเข้าข้อมูล OIT</h3>
                 <p className="text-gray-500 text-lg">ยังไม่มีเอกสาร ITA ถูกเผยแพร่ในระบบ ผู้ดูแลระบบสามารถเพิ่มเอกสารผ่านหน้า Admin CMS จัดการข้อมูล ITA</p>
               </div>
             ) : (
               <div className="space-y-12">
                 {oitData.map((indicatorGroup, index) => (
                   <OITTableDisplay key={index} index={index} data={indicatorGroup} />
                 ))}
               </div>
             )}
          </div>
        </div>
      </main>
    </div>
  );
}
