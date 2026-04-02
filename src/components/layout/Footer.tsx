import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getDictionary, Locale } from '@/i18n/dictionaries';

export default function Footer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).footer;
  const nav = getDictionary(lang).nav;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href={`/${lang}`} className="flex items-center space-x-3">
              <div className="bg-white p-1.5 rounded-lg shrink-0">
                <Image src="/logo.png" alt="Ban Hong Hospital" width={40} height={40} className="w-10 h-10 object-contain" />
              </div>
              <span className="text-xl font-bold">Ban Hong Hospital</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm">
              {t.desc}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href={`/${lang}/departments`} className="hover:text-white transition-colors">{nav.departments}</Link></li>
              <li><Link href={`/${lang}/doctors`} className="hover:text-white transition-colors">{nav.findDoctor}</Link></li>
              <li><Link href={`/${lang}/appointment`} className="hover:text-white transition-colors">{nav.bookAppt}</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-white transition-colors">{nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t.contactInfo}</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Medical Center Blvd, Health City</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@banhong.go.th</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t.emergency}</h3>
            <div className="p-4 bg-red-600 rounded-lg text-white">
              <p className="font-bold mb-1">{t.erWard}</p>
              <p className="text-2xl font-black">+1 (555) 911-0000</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Ban Hong Hospital. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
