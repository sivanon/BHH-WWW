import { getDictionary, Locale } from '@/i18n/dictionaries';
import { prisma } from '@/lib/prisma';
import { BedDouble, Check, Wifi, Tv, Coffee } from 'lucide-react';

export default async function RoomsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  
  // Try to get from real DB, but fallback to static if empty (for instant demo)
  const dbRooms = await prisma.roomRate.findMany({ orderBy: { price: 'desc' } });
  
  const defaultRooms = [
    {
      id: "1",
      name: "ห้องพิเศษเดี่ยว VIP (VIP Suite)",
      price: 2500,
      description: "ห้องพักส่วนตัวกว้างขวางเพื่อการพักผ่อนอย่างเต็มที่ พร้อมพื้นที่สำหรับผู้ติดตาม",
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      amenities: ["เตียงไฟฟ้าปรับระดับ", "โซฟาเบดสำหรับญาติ", "สมาร์ททีวี 55 นิ้ว", "ตู้เย็นและไมโครเวฟ", "อินเทอร์เน็ต Wi-Fi", "ชุดของใช้ในห้องน้ำ"]
    },
    {
      id: "2",
      name: "ห้องเตียงเดี่ยวมาตรฐาน (Standard Single)",
      price: 1500,
      description: "ห้องพักเดี่ยวราคาประหยัด ให้ความเป็นส่วนตัวแก่ผู้ป่วยระหว่างการพักฟื้น",
      imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3caa4c13d9?w=800&q=80",
      amenities: ["เตียงผู้ป่วยมาตรฐาน", "โต๊ะรับประทานอาหาร", "ทีวี 32 นิ้ว", "โทรศัพท์ภายใน", "ตู้เย็นขนาดเล็ก"]
    },
    {
      id: "3",
      name: "ห้องพักรวม 4 เตียง (Shared Ward 4-Bed)",
      price: 600,
      description: "ดูแลอย่างใกล้ชิดตลอด 24 ชั่วโมงโดยทีมพยาบาลวิชาชีพ ในพื้นที่โปร่งโล่งสบาย",
      imageUrl: "https://images.unsplash.com/photo-1538108149393-cebb47cbdfa6?w=800&q=80",
      amenities: ["เครื่องปรับอากาศส่วนกลาง", "ผ้าม่านกั้นเพิ่มความเป็นส่วนตัว", "ล็อกเกอร์เก็บของส่วนตัว", "ปุ่มกดเรียกพยาบาลฉุกเฉิน"]
    }
  ];

  const roomsToDisplay = dbRooms.length > 0 ? dbRooms.map(r => ({ ...r, amenities: r.amenities.split(',') })) : defaultRooms;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BedDouble className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm mb-4">อัตราค่าห้องพักผู้ป่วย</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">ทางโรงพยาบาลได้จัดเตรียมห้องพักหลากหลายรูปแบบ เพื่อให้เหมาะสมกับความต้องการและงบประมาณของผู้ป่วยทุกท่าน</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomsToDisplay.map((room) => (
              <div key={room.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden flex flex-col">
                <div className="aspect-[4/3] relative bg-gray-200">
                  <img src={room.imageUrl || ""} alt={room.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{room.name}</h3>
                  <div className="text-3xl font-extrabold text-primary mb-4">{room.price.toLocaleString()} <span className="text-base font-medium text-gray-500">บาท/คืน</span></div>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{room.description}</p>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">สิ่งอำนวยความสะดวก</h4>
                    <ul className="space-y-3">
                      {room.amenities.map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-700">
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{item.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center text-blue-800">
            <p className="font-bold text-lg mb-2">📌 หมายเหตุสำคัญ:</p>
            <p className="opacity-80">อัตราค่าห้องพักข้างต้น เป็นราคาเฉพาะค่าห้อง ค่าอาหาร และบริการพยาบาล ยังไม่รวมค่ารักษาพยาบาล ค่ายา และค่าธรรมเนียมแพทย์ ราคาอาจมีการเปลี่ยนแปลงโดยไม่ต้องแจ้งให้ทราบล่วงหน้า</p>
          </div>
        </div>
      </main>

          </div>
  );
}
