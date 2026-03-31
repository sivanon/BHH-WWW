const fs = require('fs');

const executivesContent = `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { User } from 'lucide-react';

export default async function ExecutivesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang;
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar lang={lang as any} />
      <div className="bg-primary py-16 text-white text-center">
        <h1 className="text-4xl font-extrabold mb-4">ทำเนียบผู้บริหาร</h1>
        <p className="text-lg text-primary-foreground/80">คณะผู้บริหารโรงพยาบาลบ้านโฮ่ง</p>
      </div>
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="flex flex-col items-center mb-16">
          <div className="w-48 h-48 bg-white rounded-full shadow-lg border-4 border-white overflow-hidden mb-6 flex items-center justify-center text-gray-300">
             <User className="w-24 h-24" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">นายแพทย์ สมชาย ใจดี</h2>
          <p className="text-primary font-bold mt-2 text-lg">ผู้อำนวยการโรงพยาบาลบ้านโฮ่ง</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-transform">
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400"><User className="w-12 h-12" /></div>
            <h3 className="text-lg font-bold text-gray-900">พญ. สมศรี สุขภาพ</h3>
            <p className="text-sm text-gray-500 mt-1">รองผู้อำนวยการฝ่ายการแพทย์</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-transform">
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400"><User className="w-12 h-12" /></div>
            <h3 className="text-lg font-bold text-gray-900">ดร. สมปอง งานดี</h3>
            <p className="text-sm text-gray-500 mt-1">รองผู้อำนวยการฝ่ายบริหาร</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-transform">
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400"><User className="w-12 h-12" /></div>
            <h3 className="text-lg font-bold text-gray-900">นพ. สมเกียรติ พยาบาล</h3>
            <p className="text-sm text-gray-500 mt-1">รองผู้อำนวยการฝ่ายปฐมภูมิ</p>
          </div>
        </div>
      </main>
      <Footer lang={lang as any} />
    </div>
  );
}`;

const visionContent = `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Target, Compass } from 'lucide-react';

export default async function VisionPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar lang={lang as any} />
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20 text-white text-center">
        <h1 className="text-4xl font-extrabold mb-4">วิสัยทัศน์ และ พันธกิจ</h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">เข็มทิศการดำเนินงานเพื่อเป้าหมายสุขภาพที่ดีของประชาชน</p>
      </div>
      <main className="flex-grow container mx-auto px-4 py-16 space-y-16 max-w-5xl">
        <section className="text-center">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-sm"><Target className="w-10 h-10" /></div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">วิสัยทัศน์ (Vision)</h2>
          <p className="text-2xl text-secondary font-medium leading-relaxed italic">
            "โรงพยาบาลชุมชนที่ทันสมัย บริการดีวิถีใหม่ บูรณาการสู่ชุมชนเพื่อประชาชนสุขภาพดี"
          </p>
        </section>

        <section className="bg-gray-50 rounded-3xl p-10 border border-gray-100 shadow-inner">
          <div className="flex items-center mb-8 border-l-4 border-primary pl-4">
            <Compass className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">พันธกิจ (Mission)</h2>
          </div>
          <ul className="space-y-6 text-lg text-gray-700">
            <li className="flex items-start"><span className="text-primary font-bold mr-3 text-xl">1.</span> ให้บริการสุขภาพแบบองค์รวมที่ได้มาตรฐานและปลอดภัย</li>
            <li className="flex items-start"><span className="text-primary font-bold mr-3 text-xl">2.</span> ส่งเสริมการมีส่วนร่วมของเครือข่ายในการจัดการสุขภาพชุมชน</li>
            <li className="flex items-start"><span className="text-primary font-bold mr-3 text-xl">3.</span> พัฒนาระบบบริหารจัดการด้วยธรรมาภิบาลและเทคโนโลยีที่ทันสมัย</li>
          </ul>
        </section>
      </main>
      <Footer lang={lang as any} />
    </div>
  );
}`;

const pdpaContent = `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldCheck } from 'lucide-react';

export default async function PDPAPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang;
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar lang={lang as any} />
      <main className="flex-grow container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-10 md:p-16">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary/10 p-5 rounded-full"><ShieldCheck className="w-16 h-16 text-primary" /></div>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">นโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)</h1>
          <p className="text-center text-gray-500 mb-10">ประกาศโรงพยาบาลบ้านโฮ่ง ว่าด้วยการคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2569</p>
          
          <div className="prose prose-blue max-w-none text-gray-700 line-clamp-none space-y-6">
            <p>โรงพยาบาลบ้านโฮ่ง ตระหนักถึงความสำคัญของการคุ้มครองข้อมูลส่วนบุคคลของผู้รับบริการ และเพื่อให้เป็นไปตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 จึงได้กำหนดนโยบายดังนี้:</p>
            <h3 className="font-bold text-xl text-gray-900">1. การเก็บรวบรวมข้อมูลส่วนบุคคล</h3>
            <p>โรงพยาบาลจะเก็บรวบรวมข้อมูลส่วนบุคคลเท่าที่จำเป็นต่อการให้บริการทางการแพทย์และการสาธารณสุข โดยใช้วิธีการที่ชอบด้วยกฎหมายและเป็นธรรม</p>
            <h3 className="font-bold text-xl text-gray-900">2. วัตถุประสงค์ในการเก็บรวบรวม</h3>
            <p>เพื่อใช้ในการตรวจวินิจฉัย รักษาพยาบาล ส่งเสริมสุขภาพ ป้องกันโรค และการเบิกจ่ายค่ารักษาพยาบาลตามสิทธิของผู้รับบริการ</p>
            <h3 className="font-bold text-xl text-gray-900">3. การรักษาความมั่นคงปลอดภัย</h3>
            <p>โรงพยาบาลมีมาตรการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลอย่างเข้มงวด เพื่อป้องกันการสูญหาย เข้าถึง ทำลาย ใช้ ดัดแปลง หรือเปิดเผยข้อมูลโดยมิชอบ</p>
          </div>
        </div>
      </main>
      <Footer lang={lang as any} />
    </div>
  );
}`;

const genericContent = (title) => `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileText, Download } from 'lucide-react';

export default async function GenericPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang;
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar lang={lang as any} />
      <div className="bg-primary py-16 text-white text-center">
        <h1 className="text-4xl font-extrabold mb-4">${title}</h1>
        <p className="text-lg text-primary-foreground/80">ศูนย์รวมเอกสารและการดำเนินงานอย่างเป็นทางการ</p>
      </div>
      <main className="flex-grow container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start group hover:border-primary hover:shadow-md transition-all cursor-pointer">
              <div className="bg-blue-50 p-4 rounded-lg text-primary mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <FileText className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">เอกสาร${title} ประจำปี 2569 ชุดที่ {\`\${i}\`}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-3">ปรับปรุงล่าสุด: {\`\${i}\`} มีนาคม 2569</p>
                <div className="inline-flex items-center text-xs font-bold text-secondary bg-orange-50 px-3 py-1 rounded-full group-hover:bg-orange-100">
                  <Download className="w-3 h-3 mr-1" /> ดาวน์โหลด PDF
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer lang={lang as any} />
    </div>
  );
}`;

fs.writeFileSync('src/app/[lang]/about/executives/page.tsx', executivesContent);
fs.writeFileSync('src/app/[lang]/about/vision/page.tsx', visionContent);
fs.writeFileSync('src/app/[lang]/about/pdpa/page.tsx', pdpaContent);
fs.writeFileSync('src/app/[lang]/about/policies/page.tsx', genericContent('นโยบายและยุทธศาสตร์'));
fs.writeFileSync('src/app/[lang]/about/structure/page.tsx', genericContent('โครงสร้างหน่วยงาน'));
fs.writeFileSync('src/app/[lang]/projects/page.tsx', genericContent('แผนงานและโครงงาน'));
console.log('Real pages fully generated successfully!');
