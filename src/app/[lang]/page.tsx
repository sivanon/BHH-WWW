import Link from 'next/link';
import { FileText, ShoppingCart, AlertCircle, Search, ArrowRight, ShieldCheck, Activity, Info, Baby, Megaphone, Bot, Sparkles, MapPin } from 'lucide-react';
import { getDictionary, Locale } from '@/i18n/dictionaries';
import { prisma } from '@/lib/prisma';

// Import Ban Hong Clone components
import WelcomeModal from '@/components/home/WelcomeModal';
import NewsMarquee from '@/components/home/NewsMarquee';
import HeroCarousel from '@/components/home/HeroCarousel';
import SmartUpdate from '@/components/home/SmartUpdate';
import ITACenter from '@/components/home/ITACenter';
import SocialChannels from '@/components/home/SocialChannels';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const t = getDictionary(lang).home;
  const nav = getDictionary(lang).nav;

  // Fetch real database news
  const dbNews = await prisma.news.findMany({ 
    where: { published: true },
    orderBy: { date: 'desc' }, 
    take: 40 
  });

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
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <WelcomeModal />
      <NewsMarquee />
      <HeroCarousel />

      {/* Smart Update Section (MTH Style) */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-10 border-l-4 border-secondary pl-4">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">อัปเดตข่าวสารล่าสุด (Smart Update)</h2>
          </div>
          <SmartUpdate news={dbNews} />
        </div>
      </section>

      {/* Medical Services Section */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10 border-l-4 border-primary pl-4">
            <h2 className="text-3xl font-bold text-gray-900">การบริการทางการแพทย์ (Medical Services)</h2>
            <Link href={`/${lang}/departments`} className="hidden md:flex items-center text-primary font-bold hover:underline text-lg">
              {t.allServices} <ArrowRight className="ml-1 w-5 h-5" />
            </Link>
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
      </section>

      {/* ITA Center Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <ITACenter />
        </div>
      </section>

      {/* Social Media & Mor Prom Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-10 border-l-4 border-primary pl-4">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">ช่องทางการติดต่อ (Connect with us)</h2>
          </div>
          <SocialChannels />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-10 border-l-4 border-secondary pl-4">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">ที่ตั้งและแผนที่การเดินทาง</h2>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 w-full h-[350px] overflow-hidden group max-w-5xl mx-auto">
            <a href="https://maps.app.goo.gl/VBszuvXFja24uwED6" target="_blank" rel="noopener noreferrer" className="w-full h-full bg-blue-50/50 hover:bg-blue-100 transition-colors rounded-2xl flex flex-col items-center justify-center text-primary cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Ban+Hong+Hospital&zoom=15&size=800x400&sensor=false')] bg-cover bg-center mix-blend-multiply"></div>
              <div className="bg-white p-4 rounded-full mb-4 z-10 shadow-md group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-10 w-10 text-primary" />
              </div>
              <span className="font-bold text-xl md:text-2xl z-10 text-gray-900 bg-white/90 px-8 py-3 rounded-full shadow-sm text-center">
                คลิกเพื่อเปิดนำทางด้วย Google Maps
              </span>
              <span className="text-sm text-gray-600 mt-4 z-10 font-bold bg-white/90 px-6 py-2 rounded-full text-center">
                No. 308, Moo. 7, Lamphun - Li Road, ตำบล บ้านโฮ่ง อำเภอ บ้านโฮ่ง ลำพูน 51130
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action: Internal Search Engine */}
      <section className="py-24 bg-gradient-to-r from-primary to-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white/10 w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-2xl backdrop-blur-sm border border-white/20">
            <Search className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight flex items-center justify-center">
            ค้นหาข้อมูลภายในเว็บไซต์
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed font-light break-words">
            พิมพ์คำค้นหาของคุณ เช่น "เวลาเปิดคลินิกพิเศษ", "ข่าวประกาศรับสมัครงาน", หรือ "คู่มือปฏิบัติงาน" <br /> 
            เพื่อค้นหาข้อมูลที่คุณต้องการได้อย่างรวดเร็วและแม่นยำ
          </p>
          <form action={`/${lang}/search`} className="max-w-2xl mx-auto relative group flex shadow-2xl">
            <div className="relative flex-grow">
              <input 
                type="text" 
                name="q"
                required
                placeholder="ค้นหาข้อมูลโรงพยาบาลรวดเร็วกว่า..." 
                className="w-full bg-white/10 backdrop-blur-md border border-white/30 border-r-0 text-white placeholder-white/60 rounded-l-2xl px-6 py-5 pl-14 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/60 w-6 h-6" />
            </div>
            <button type="submit" className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-5 rounded-r-2xl border border-secondary transition-all flex items-center text-lg">
              ค้นหา <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
