import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Locale } from "@/i18n/dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  const title = lang === 'th' ? "โรงพยาบาลบ้านโฮ่ง - บริการสุขภาพระดับพรีเมียม" : "Ban Hong Hospital - Premium Healthcare";
  const description = lang === 'th' 
    ? "เว็บไซต์โรงพยาบาลที่ทันสมัย พร้อมบริการทางการแพทย์มาตรฐานสากล จองคิวออนไลน์ง่ายๆ" 
    : "Modern, responsive, and fully accessible Hospital Website providing world-class healthcare.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'th' ? 'th_TH' : 'en_US',
      siteName: 'Ban Hong Hospital',
      images: [
        {
          url: '/api/og?title=Ban%20Hong%20Hospital',
          width: 1200,
          height: 630,
          alt: 'Ban Hong Hospital Cover Image',
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/api/og?title=Ban%20Hong%20Hospital'],
    }
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;
  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar lang={locale} />
        <main className="flex-1">{children}</main>
        <Footer lang={locale} />
      </body>
    </html>
  );
}
