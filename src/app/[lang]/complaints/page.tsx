"use client";

import { useState } from 'react';
import { submitComplaint } from '@/app/actions/complaints';
import { getDictionary, Locale } from '@/i18n/dictionaries';
import { CheckCircle2, MessageSquareWarning } from 'lucide-react';

export default function ComplaintsPage({ params }: { params: { lang: string } }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      senderName: formData.get('senderName') as string,
      patientId: formData.get('patientId') as string,
      topic: formData.get('topic') as string,
      description: formData.get('description') as string,
      contactInfo: formData.get('contactInfo') as string,
    };
    
    try {
      await submitComplaint(data);
      setSuccess(true);
    } catch(err) {
      alert("Error submitting complaint");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 bg-gray-50">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">ส่งเรื่องร้องเรียนสำเร็จ</h2>
        <p className="text-gray-600 mb-8 max-w-md text-center">
          ระบบได้รับเรื่องของคุณเรียบร้อยแล้ว ทางผู้บริหารจะนำเรื่องไปพิจารณาและดำเนินการแก้ไขโดยเร็วที่สุด ขอขอบพระคุณสำหรับข้อเสนอแนะครับ
        </p>
        <button onClick={() => window.location.href="/"} className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90">
          กลับสู่หน้าหลัก
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquareWarning className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">ระบบรับฟังความคิดเห็นและร้องเรียน</h1>
          <p className="text-lg text-gray-600">
            เพื่อการพัฒนาและปรับปรุงการให้บริการ (ITA) ข้อมูลของคุณจะถูกเก็บเป็นความลับและส่งตรงถึงผู้บริหาร
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อ-นามสกุล (ผู้ร้องเรียน)</label>
                <input required type="text" name="senderName" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary text-gray-900" placeholder="เช่น นายสมมติ ทดสอบ" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">รหัสผู้ป่วย (HN) (ถ้ามี)</label>
                <input type="text" name="patientId" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary inline focus:border-primary text-gray-900" placeholder="ไม่บังคับ" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">หัวข้อเรื่องที่ร้องเรียน/เสนอแนะ</label>
              <input required type="text" name="topic" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary text-gray-900" placeholder="เช่น การบริการทางการแพทย์, พฤติกรรมเจ้าหน้าที่, ความสะอาด" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">รายละเอียดข้อร้องเรียน</label>
              <textarea required name="description" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary text-gray-900" placeholder="โปรดระบุรายละเอียด วันเวลา สถานที่เกิดเหตุ เพื่อประโยชน์ในการตรวจสอบ..." />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ข้อมูลติดต่อกลับ (เบอร์โทร หรือ อีเมล)</label>
              <input required type="text" name="contactInfo" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary text-gray-900" placeholder="เบอร์โทรศัพท์มือถือ หรือ อีเมลที่ติดต่อได้" />
            </div>

            <div className="pt-4 border-t border-gray-100 mt-8">
              <button disabled={loading} type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition shadow-md hover:shadow-lg disabled:opacity-50 text-lg">
                {loading ? "กำลังส่งข้อมูล..." : "ส่งเรื่องร้องเรียน"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
