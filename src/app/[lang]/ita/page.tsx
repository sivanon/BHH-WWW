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
    "ตัวชี้วัดที่ 1 การเปิดเผยข้อมูล (MOIT 1 - MOIT 2)",
    "ตัวชี้วัดที่ 2 การจัดซื้อจัดจ้างหรือการจัดหาพัสดุ (MOIT 3 - MOIT 5)",
    "ตัวชี้วัดที่ 3 การบริหารและพัฒนาทรัพยากรบุคคล (MOIT 6 - MOIT 8)",
    "ตัวชี้วัดที่ 4 การส่งเสริมความโปร่งใส (MOIT 9 - MOIT 11)",
    "ตัวชี้วัดที่ 5 การป้องกันการรับสินบน (MOIT 12 - MOIT 13)",
    "ตัวชี้วัดที่ 6 การป้องกันการใช้ทรัพย์สินของราชการ (MOIT 14)",
    "ตัวชี้วัดที่ 7 การดำเนินการเพื่อป้องกันการทุจริต (MOIT 15 - MOIT 19)",
    "ตัวชี้วัดที่ 8 การป้องกันผลประโยชน์ทับซ้อน (MOIT 20)",
    "ตัวชี้วัดที่ 9 การเสริมสร้างวัฒนธรรมองค์กร (MOIT 21 - MOIT 22)"
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

  const moitDefinitions = [
    { code: "MOIT 1", title: "หน่วยงานมีการวางระบบโดยการกำหนดมาตรการการเผยแพร่ข้อมูลต่อสาธารณะผ่านเว็บไซต์ของหน่วยงาน", indicatorId: 1 },
    { code: "MOIT 2", title: "หน่วยงานมีการเปิดเผยข้อมูลข่าวสารที่เป็นปัจจุบัน", indicatorId: 1 },
    { code: "MOIT 3", title: "หน่วยงานมีรายงานการวิเคราะห์ผลการจัดซื้อจัดจ้างและการจัดหาพัสดุของปีงบประมาณในปีที่ผ่านมา (ของปีงบประมาณ พ.ศ. 2568)", indicatorId: 2 },
    { code: "MOIT 4", title: "หน่วยงานมีการวางระบบการจัดซื้อจัดจ้างหรือการจัดหาพัสดุประจำปีงบประมาณ พ.ศ. 2569", indicatorId: 2 },
    { code: "MOIT 5", title: "หน่วยงานมีการสรุปผลการจัดซื้อจัดจ้างและการจัดหาพัสดุรายเดือน ประจำปีงบประมาณ พ.ศ. 2569", indicatorId: 2 },
    { code: "MOIT 6", title: "ผู้บริหารแสดงนโยบายการบริหารและพัฒนาทรัพยากรบุคคล", indicatorId: 3 },
    { code: "MOIT 7", title: "หน่วยงานมีการรายงานการประเมินผลการปฏิบัติราชการของบุคลากรในหน่วยงานและเปิดเผยผลการปฏิบัติราชการ ระดับดีเด่น และระดับดีมาก ในที่เปิดเผยให้ทราบ ของปีงบประมาณ พ.ศ. 2568 และปีงบประมาณ พ.ศ. 2569", indicatorId: 3 },
    { code: "MOIT 8", title: "หน่วยงานมีการอบรมให้ความรู้แก่เจ้าหน้าที่ภายในหน่วยงานเกี่ยวกับการเสริมสร้างและพัฒนาทางด้านจริยธรรมและการรักษาวินัย รวมทั้งการป้องกันมิให้กระทำผิดวินัย ปีงบประมาณ พ.ศ. 2569", indicatorId: 3 },
    { code: "MOIT 9", title: "หน่วยงานมีแนวปฏิบัติการจัดการเรื่องร้องเรียน และช่องทางการร้องเรียน", indicatorId: 4 },
    { code: "MOIT 10", title: "หน่วยงานมีสรุปผลการดำเนินงานเรื่องร้องเรียนการปฏิบัติงานหรือการให้บริการของเจ้าหน้าที่ภายในหน่วยงาน และเรื่องร้องเรียนการทุจริตและประพฤติมิชอบ", indicatorId: 4 },
    { code: "MOIT 11", title: "หน่วยงานของท่านเปิดโอกาสให้ผู้มีส่วนได้ส่วนเสียมีโอกาสเข้ามามีส่วนร่วมในการดำเนินงานตามภารกิจของหน่วยงาน", indicatorId: 4 },
    { code: "MOIT 12", title: "หน่วยงานมีมาตรการ “การป้องกันการรับสินบน” ที่เป็นระบบ", indicatorId: 5 },
    { code: "MOIT 13", title: "หน่วยงานจัดทำแนวทางปฏิบัติของหน่วยงาน ในปีงบประมาณ พ.ศ.2568-2569 ตามประกาศกระทรวงสาธารณสุข เรื่อง เกณฑ์จริยธรรมการจัดซื้อจัดหาและการส่งเสริมการขายยาและเวชภัณฑ์ที่มิใช่ยาของกระทรวงสาธารณสุข พ.ศ. 2564", indicatorId: 5 },
    { code: "MOIT 14", title: "หน่วยงานมีแนวทางปฏิบัติเกี่ยวกับการใช้ทรัพย์สินของราชการ และมีขั้นตอนการขออนุญาตเพื่อยืมทรัพย์สินของราชการไปใช้ปฏิบัติในหน่วยงานที่ถูกต้อง", indicatorId: 6 },
    { code: "MOIT 15", title: "หน่วยงานมีแผนปฏิบัติการป้องกัน ปราบปรามการทุจริตและประพฤติมิชอบและแผนปฏิบัติการส่งเสริมคุณธรรมของชมรมจริยธรรม ประจำปีงบประมาณ พ.ศ. 2569", indicatorId: 7 },
    { code: "MOIT 16", title: "หน่วยงานมีรายงานผลการดำเนินงานตามแผนปฏิบัติการป้องกัน ปราบปรามการทุจริตและประพฤติมิชอบ ประจำปีงบประมาณ พ.ศ. 2569 และรายงานผลการดำเนินงานตามแผนปฏิบัติการส่งเสริมคุณธรรมของชมรมจริยธรรมของหน่วยงาน ประจำปีงบประมาณ พ.ศ. 2569", indicatorId: 7 },
    { code: "MOIT 17", title: "หน่วยงานมีการประเมินความเสี่ยงการทุจริต ประจำปีงบประมาณ พ.ศ. 2569 อย่างเป็นระบบ", indicatorId: 7 },
    { code: "MOIT 18", title: "หน่วยงานมีการปฏิบัติตามมาตรการป้องกันการทุจริต (การควบคุมความเสี่ยงการทุจริต)", indicatorId: 7 },
    { code: "MOIT 19", title: "หน่วยงานมีการรายงานผลการส่งเสริมการปฏิบัติตามประมวลจริยธรรมข้าราชการพลเรือน : กรณีการเรี่ยไรและกรณีการให้หรือรับของขวัญหรือประโยชน์อื่นใด ประจำปีงบประมาณ พ.ศ. 2569", indicatorId: 7 },
    { code: "MOIT 20", title: "หน่วยงานมีส่วนร่วมกิจกรรมวันต่อต้านคอรัปชั่นสากล (ประเทศไทย) วันที่ 9 ธันวาคม พ.ศ. 2568 ประจำปีงบประมาณ พ.ศ. 2569 ของสำนักงานคณะกรรมการป้องกันและปราบปรามการทุจริตแห่งชาติ (สำนักงาน ป.ป.ช.)", indicatorId: 8 },
    { code: "MOIT 21", title: "หน่วยงานมีการเผยแพร่เจตจำนงสุจริตของการปฏิบัติหน้าที่ราชการ และนโยบายที่เคารพสิทธิมนุษยชนและศักดิ์ศรีของผู้ปฏิบัติงานและของผู้บริหารต่อสาธารณชน", indicatorId: 9 },
    { code: "MOIT 22", title: "หน่วยงานมีแนวปฏิบัติที่เคารพสิทธิมนุษยชนและศักดิ์ศรีของผู้ปฏิบัติงาน และรายงานการป้องกันและแก้ไขปัญหาการล่วงละเมิดหรือคุกคามทางเพศในการทำงานประจำปีงบประมาณ พ.ศ. 2569", indicatorId: 9 }
  ];

  // Group fetched database documents into their predefined MOIT slots
  const oitData = indicatorTitles.map((title, index) => {
    const indicatorId = index + 1;
    const items = moitDefinitions.filter(m => m.indicatorId === indicatorId).map(moit => {
      const normalizedMoitCode = moit.code.replace(/\s+/g, '').toUpperCase();
      const matchedDocs = rawDocs.filter(d => {
        if (d.indicator !== indicatorId) return false;
        const rawCode = (d.oitCode || "").replace(/\s+/g, '').toUpperCase();
        
        // Exact prefix matching: Ensure "MOIT1" matches "MOIT1.1" but NOT "MOIT10"
        const regex = new RegExp('^' + normalizedMoitCode + '([^0-9]|$)');
        return regex.test(rawCode);
      });
      return {
        code: moit.code,
        title: moit.title,
        documents: matchedDocs.map(d => ({
          name: d.name,
          url: d.url,
          size: d.size,
          oitCode: d.oitCode
        }))
      };
    });

    return {
      title,
      description: descriptions[index],
      items
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
