"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Phone, Globe, ShieldPlus } from 'lucide-react';
import { getDictionary, Locale } from '@/i18n/dictionaries';

export default function Navbar({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).nav;
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = () => {
    const newLang = lang === 'th' ? 'en' : 'th';
    const currentPathWithoutLang = pathname.replace(`/${lang}`, '') || '/';
    router.push(`/${newLang}${currentPathWithoutLang}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm font-sans">
      {/* Official Government Top Bar */}
      <div className="bg-primary text-primary-foreground py-1.5 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-xs font-medium">
          <div className="flex items-center space-x-4">
            <span>{lang === 'th' ? 'กระทรวงสาธารณสุข' : 'Ministry of Public Health'}</span>
            <span className="opacity-60">|</span>
            <span>{lang === 'th' ? 'สายด่วนกรมควบคุมโรค 1422' : 'DDC Hotline 1422'}</span>
          </div>
          <div className="flex space-x-4">
            <Link href={`/${lang}/admin`} className="hover:underline">{lang === 'th' ? 'สำหรับเจ้าหน้าที่ (Admin)' : 'Staff Intranet'}</Link>
            <button onClick={switchLanguage} className="flex items-center hover:underline focus:outline-none" aria-label="Switch Language">
              <Globe className="h-3 w-3 mr-1" />
              {lang === 'th' ? 'English' : 'ภาษาไทย'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center space-x-3 text-primary">
          <ShieldPlus className="h-10 w-10 text-secondary" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight leading-none text-gray-900">
              {lang === 'th' ? 'โรงพยาบาลบ้านโฮ่ง' : 'Ban Hong Hospital'}
            </span>
            <span className="text-[0.65rem] md:text-xs font-semibold tracking-wider text-primary mt-1">
              MINISTRY OF PUBLIC HEALTH
            </span>
          </div>
        </Link>
        
        <nav className="hidden lg:flex gap-6 xl:gap-8">
          <Link href={`/${lang}`} className="text-sm font-bold text-gray-700 hover:text-primary transition-colors uppercase border-b-2 border-transparent hover:border-primary pb-1">หน้าแรก</Link>
          
          {/* ข้อมูลโรงพยาบาล Dropdown */}
          <div className="relative group">
            <button className="text-sm font-bold text-gray-700 hover:text-primary transition-colors uppercase border-b-2 border-transparent hover:border-primary pb-1 flex items-center cursor-pointer">
              ข้อมูลโรงพยาบาล
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
              <div className="py-2">
                <Link href={`/${lang}/about/executives`} className="block px-6 py-3 text-sm font-bold text-gray-600 hover:text-primary hover:bg-gray-50 border-b border-gray-50 last:border-0">ผู้บริหารหน่วยงาน</Link>
                <Link href={`/${lang}/about/policies`} className="block px-6 py-3 text-sm font-bold text-gray-600 hover:text-primary hover:bg-gray-50 border-b border-gray-50 last:border-0">นโยบายและยุทธศาสตร์</Link>
                <Link href={`/${lang}/about/vision`} className="block px-6 py-3 text-sm font-bold text-gray-600 hover:text-primary hover:bg-gray-50 border-b border-gray-50 last:border-0">วิสัยทัศน์ พันธกิจ</Link>
                <Link href={`/${lang}/about/structure`} className="block px-6 py-3 text-sm font-bold text-gray-600 hover:text-primary hover:bg-gray-50 border-b border-gray-50 last:border-0">โครงสร้างหน่วยงาน</Link>
                <Link href={`/${lang}/ita`} className="block px-6 py-3 text-sm font-bold text-gray-600 hover:text-primary hover:bg-gray-50 border-b border-gray-50 last:border-0">โครงการ ITA</Link>
                <Link href={`/${lang}/about/pdpa`} className="block px-6 py-3 text-sm font-bold text-gray-600 hover:text-primary hover:bg-gray-50 last:border-0">PDPA (พรบ ข้อมูลส่วนบุคคล)</Link>
              </div>
            </div>
          </div>

          <Link href={`/${lang}/projects`} className="text-sm font-bold text-gray-700 hover:text-primary transition-colors uppercase border-b-2 border-transparent hover:border-primary pb-1 flex items-center h-full">แผนงานและโครงงาน</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={switchLanguage} className="md:hidden flex items-center text-sm font-bold text-gray-700 hover:text-primary transition-colors" aria-label="Switch Language">
            <Globe className="h-5 w-5 mr-1" />
            {lang === 'th' ? 'EN' : 'TH'}
          </button>
          
          <a 
            href="tel:1669" 
            className="hidden md:inline-flex h-11 items-center justify-center rounded-md border-2 border-red-600 text-red-600 px-6 font-bold shadow-sm transition-colors hover:bg-red-600 hover:text-white"
          >
            <Phone className="mr-2 h-5 w-5" />
            <span>{lang === 'th' ? 'สายด่วน 1669' : 'ER 1669'}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
