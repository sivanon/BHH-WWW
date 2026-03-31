"use client";

import { getMockData } from '@/lib/mockData';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getDictionary, Locale } from '@/i18n/dictionaries';

export default function ContactPage() {
  const params = useParams();
  const lang = (params?.lang as Locale) || 'th';
  const t = getDictionary(lang).contact;
  const { mockFaqs } = getMockData(lang);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info & Hours */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">{t.getInTouch}</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{t.addressLbl}</h3>
                    <p className="text-gray-600 mt-1">123 Medical Center Blvd<br/>Health City, HC 10001</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{t.phoneLbl}</h3>
                    <p className="text-gray-600 mt-1">General: +1 (555) 123-4567<br/>Emergency: +1 (555) 911-0000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{t.emailLbl}</h3>
                    <p className="text-gray-600 mt-1">info@banhong.go.th<br/>appointments@banhong.go.th</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">{t.hoursTitle}</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium flex items-center"><Clock className="mr-2 h-4 w-4" /> {t.regClinics}</span>
                  <span>{t.regHours}</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium flex items-center"><Clock className="mr-2 h-4 w-4" /> {t.pharmacy}</span>
                  <span>{t.pharmHours}</span>
                </div>
                <div className="flex justify-between items-center text-red-600 font-bold bg-red-50 p-3 rounded-md">
                  <span className="flex items-center"><Clock className="mr-2 h-5 w-5" /> {t.er}</span>
                  <span>{t.erHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map & FAQs */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-1 w-full h-[300px] overflow-hidden">
              <div className="w-full h-full bg-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400">
                <MapPin className="h-12 w-12 mb-2 text-gray-400" />
                <span className="font-medium">{t.map}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">{t.faqTitle}</h2>
              <div className="space-y-6">
                {mockFaqs.map((faq) => (
                  <div key={faq.id} className="group">
                    <h3 className="font-semibold text-lg text-primary mb-2 flex items-start">
                      <span className="text-secondary mr-2 font-bold">Q.</span> {faq.question}
                    </h3>
                    <p className="text-gray-600 pl-6 border-l-2 border-gray-100 ml-2">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
