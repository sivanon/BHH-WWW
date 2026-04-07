import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import { LayoutDashboard, FileText, ShieldPlus, UserCircle, Plus, Edit2, Trash2, Stethoscope, MessageSquareWarning, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { createDoctor, deleteDoctor } from "@/app/actions/doctors";

export default async function DoctorsManager() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/th/admin/login");

  const doctorsList = await prisma.doctor.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="font-sans">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">จัดการข้อมูลแพทย์</h1>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-800 flex items-center"><Plus className="w-5 h-5 mr-2 text-primary" /> เพิ่มรายชื่อแพทย์ (Create Doctor)</h2>
            </div>
            <form action={createDoctor} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">ชื่อ-นามสกุล (Name)</label>
                  <input type="text" name="name" required className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-primary focus:border-primary" placeholder="นพ. สมชาย ใจดี" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">ความเชี่ยวชาญ (Specialty)</label>
                  <input type="text" name="specialty" required className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-primary focus:border-primary" placeholder="อายุรกรรมทั่วไป" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">ประสบการณ์ (ปี)</label>
                  <input type="number" name="experience" min="0" defaultValue={0} required className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">เวลาออกตรวจ</label>
                  <input type="text" name="availableHours" defaultValue="09.00 - 16.00" className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">สถานที่ (Location)</label>
                  <input type="text" name="location" defaultValue="อาคารผู้ป่วยนอก ชั้น 1" className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-primary focus:border-primary" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">รูปถ่ายแพทย์ (Profile Photo)</label>
                <input type="file" name="image" accept="image/*" className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-primary focus:border-primary bg-white" />
              </div>
              <button type="submit" className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition shadow-sm">
                บันทึกรายชื่อแพทย์
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-bold border-b border-gray-200 w-16">รูปภาพ</th>
                  <th className="p-4 font-bold border-b border-gray-200">ชื่อ-นามสกุล</th>
                  <th className="p-4 font-bold border-b border-gray-200">ความเชี่ยวชาญ</th>
                  <th className="p-4 font-bold border-b border-gray-200">เวลาออกตรวจ</th>
                  <th className="p-4 font-bold border-b border-gray-200 text-right">แอคชั่น</th>
                </tr>
              </thead>
              <tbody>
                {doctorsList.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-500">ยังไม่มีรายชื่อแพทย์ในระบบ</td></tr>
                )}
                {doctorsList.map(doctor => (
                  <tr key={doctor.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-4">
                      {doctor.imageUrl ? (
                        <img src={doctor.imageUrl} alt={doctor.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><Stethoscope className="w-5 h-5"/></div>
                      )}
                    </td>
                    <td className="p-4 font-bold text-gray-900">{doctor.name}</td>
                    <td className="p-4 text-gray-600"><span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{doctor.specialty}</span></td>
                    <td className="p-4 text-sm text-gray-500">{doctor.availableHours}</td>
                    <td className="p-4 text-right">
                      <form action={async () => { "use server"; await deleteDoctor(doctor.id); }}>
                        <button type="submit" className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition" title="ลบข้อมูล">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}
