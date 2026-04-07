import { getDictionary, Locale } from '@/i18n/dictionaries';
import { Activity, AlertCircle, ShieldCheck, Sparkles, Info } from 'lucide-react';

export default async function DepartmentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const t = getDictionary(lang).depts;

  const medicalServices = [
    { title: "บริการผู้ป่วยนอก (OPD)", icon: Activity, desc: "ตรวจรักษาโรคทั่วไป ให้คำปรึกษาและส่งเสริมสุขภาพ", phone: "053-980-377 ต่อ 101" },
    { title: "งานอุบัติเหตุ-ฉุกเฉิน (ER)", icon: AlertCircle, desc: "บริการฉุกเฉิน 24 ชั่วโมง ช่วยเหลือและกู้ชีพผู้ป่วยวิกฤต", phone: "1669 หรือ 053-980-377 ต่อ 119" },
    { title: "ตึกนอนผู้ป่วยใน (IPD)", icon: ShieldCheck, desc: "ดูแลผู้ป่วยที่ต้องพักรักษาตัว พร้อมทีมแพทย์พยาบาลดูแล 24 ชม.", phone: "053-980-377 ต่อ 201" },
    { title: "บริการทันตกรรม", icon: Sparkles, desc: "อุดฟัน ถอนฟัน ขูดหินปูน และดูแลสุขภาพช่องปากครบวงจร", phone: "053-980-377 ต่อ 105" },
    { title: "กายภาพบำบัด", icon: Activity, desc: "ฟื้นฟูสมรรถภาพร่างกาย พัฒนาการเคลื่อนไหว ลดอาการปวด", phone: "053-980-377 ต่อ 107" },
    { title: "แพทย์แผนไทย", icon: Sparkles, desc: "นวดแผนไทย ประคบสมุนไพร บำบัดรักษาฟื้นฟูคุณผู้ป่วยและการแพทย์พื้นบ้าน", phone: "053-980-377 ต่อ 108" },
    { title: "งานจิตเวชและยาเสพติด", icon: Info, desc: "ให้คำปรึกษาปัญหาสุขภาพจิต ความเครียด และบำบัดผู้ติดยาเสพติด", phone: "053-980-377 ต่อ 109" },
  ];

  return (
    <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-200px)] font-sans">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">การบริการทางการแพทย์</h1>
        <p className="text-xl text-gray-600">
          (Medical Services) บริการทุกแผนกของโรงพยาบาลบ้านโฮ่งที่คุณสามารถไว้ใจได้
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {medicalServices.map((service, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col group">
            <div className="bg-primary/10 p-4 rounded-xl text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors self-start">
              <service.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{service.title}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">{service.desc}</p>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mt-auto">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">ติดต่อสอบถาม</p>
              <p className="text-primary font-bold">{service.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
