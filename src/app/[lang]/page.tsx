import Link from 'next/link';
import { FileText, ShoppingCart, AlertCircle, Search, ArrowRight, ShieldCheck, Activity, Info, Baby, Megaphone, Bot, Sparkles } from 'lucide-react';
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

  const specialClinics = [
    { title: t.fertility, icon: Baby, link: `/${lang}/departments` },
    { title: t.acupuncture, icon: Activity, link: `/${lang}/departments` },
    { title: t.xray, icon: ShieldCheck, link: `/${lang}/departments` },
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

      {/* ITA Center Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
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

      {/* Special Clinics */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10 border-l-4 border-primary pl-4">
            <h2 className="text-3xl font-bold text-gray-900">{t.specialClinics}</h2>
            <Link href={`/${lang}/departments`} className="hidden md:flex items-center text-primary font-bold hover:underline text-lg">
              {t.allServices} <ArrowRight className="ml-1 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialClinics.map((clinic, i) => (
              <Link href={clinic.link} key={i}>
                <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center group">
                  <div className="bg-primary/10 p-5 rounded-2xl text-primary mr-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <clinic.icon className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{clinic.title}</h3>
                    <p className="text-secondary font-medium mt-1">{t.learnMore} &rarr;</p>
                  </div>
                </div>
              </Link>
            ))}
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
            พิมพ์คำค้นหาของคุณ เช่น "เวลาเปิดคลินิกพิเศษ", "ข่าวประกาศรับสมัครงาน", หรือ "คู่มือปฏิบัติงาน" <br className="hidden md:block"/> 
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
