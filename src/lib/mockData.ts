import { Locale } from '@/i18n/dictionaries';

export type Specialty = 'Cardiology' | 'Neurology' | 'Pediatrics' | 'Orthopedics' | 'Dermatology' | 'หทัยวิทยา' | 'ประสาทวิทยา' | 'กุมารเวชกรรม' | 'ศัลยกรรมกระดูก' | 'ตจวิทยา';

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  experience: number;
  imageUrl: string;
  availability: string;
}

export interface Department {
  id: string;
  name: Specialty;
  description: string;
  iconName: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const getMockData = (lang: Locale) => {
  const isTh = lang === 'th';

  const mockDoctors: Doctor[] = [
    {
      id: 'd1',
      name: isTh ? 'พญ. ซาร่า สมิธ' : 'Dr. Sarah Smith',
      specialty: isTh ? 'หทัยวิทยา' : 'Cardiology',
      experience: 15,
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
      availability: isTh ? 'จันทร์, พุธ, ศุกร์' : 'Mon, Wed, Fri'
    },
    {
      id: 'd2',
      name: isTh ? 'นพ. เจมส์ วิลสัน' : 'Dr. James Wilson',
      specialty: isTh ? 'ประสาทวิทยา' : 'Neurology',
      experience: 12,
      imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
      availability: isTh ? 'อังคาร, พฤหัสบดี' : 'Tue, Thu'
    },
    {
      id: 'd3',
      name: isTh ? 'พญ. เอมิลี่ เฉิน' : 'Dr. Emily Chen',
      specialty: isTh ? 'กุมารเวชกรรม' : 'Pediatrics',
      experience: 8,
      imageUrl: 'https://images.unsplash.com/photo-1594824436998-058df31f62cb?auto=format&fit=crop&q=80&w=300&h=300',
      availability: isTh ? 'จันทร์, อังคาร, พุธ' : 'Mon, Tue, Wed'
    },
    {
      id: 'd4',
      name: isTh ? 'นพ. ไมเคิล บราวน์' : 'Dr. Michael Brown',
      specialty: isTh ? 'ศัลยกรรมกระดูก' : 'Orthopedics',
      experience: 20,
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
      availability: isTh ? 'พฤหัสบดี, ศุกร์' : 'Thu, Fri'
    },
    {
      id: 'd5',
      name: isTh ? 'พญ. ลิซ่า เดวิส' : 'Dr. Lisa Davis',
      specialty: isTh ? 'ตจวิทยา' : 'Dermatology',
      experience: 10,
      imageUrl: 'https://images.unsplash.com/photo-1527613426496-2287f3b8908f?auto=format&fit=crop&q=80&w=300&h=300',
      availability: isTh ? 'พุธ, ศุกร์' : 'Wed, Fri'
    }
  ];

  const mockDepartments: Department[] = [
    { id: 'dep1', name: isTh ? 'หทัยวิทยา' : 'Cardiology', description: isTh ? 'การดูแลหัวใจและการผ่าตัดหลอดเลือดหัวใจแบบครบวงจร' : 'Comprehensive heart care and cardiovascular surgeries.', iconName: 'Heart' },
    { id: 'dep2', name: isTh ? 'ประสาทวิทยา' : 'Neurology', description: isTh ? 'การรักษาขั้นสูงสำหรับความผิดปกติของสมองและระบบประสาท' : 'Advanced treatment for brain and nervous system disorders.', iconName: 'Brain' },
    { id: 'dep3', name: isTh ? 'กุมารเวชกรรม' : 'Pediatrics', description: isTh ? 'การดูแลรักษาสุขภาพเฉพาะทางสำหรับทารก เด็ก และวัยรุ่น' : 'Specialized healthcare for infants, children, and adolescents.', iconName: 'Baby' },
    { id: 'dep4', name: isTh ? 'ศัลยกรรมกระดูก' : 'Orthopedics', description: isTh ? 'การรักษาปัญหาระบบกระดูกและกล้ามเนื้อ รวมถึงอาการบาดเจ็บ' : 'Treatment of musculoskeletal system issues and injuries.', iconName: 'Bone' },
    { id: 'dep5', name: isTh ? 'ตจวิทยา' : 'Dermatology', description: isTh ? 'การดูแลผิวหนัง ผม และเล็บ ทั้งทางการแพทย์และความงาม' : 'Medical and cosmetic care for skin, hair, and nails.', iconName: 'Activity' }
  ];

  const mockServices: Service[] = [
    { id: 's1', title: isTh ? 'ฉุกเฉิน 24 ชม.' : '24/7 Emergency', description: isTh ? 'การดูแลทางการแพทย์อย่างทันท่วงทีสำหรับกรณีวิกฤตทุกเวลา' : 'Immediate medical attention for critical cases at any hour.' },
    { id: 's2', title: isTh ? 'ให้คำปรึกษาออนไลน์' : 'Online Consultations', description: isTh ? 'ปรึกษาผู้เชี่ยวชาญจากที่บ้านของคุณ' : 'Consult with our top specialists from the comfort of your home.' },
    { id: 's3', title: isTh ? 'การวินิจฉัยขั้นสูง' : 'Advanced Diagnostics', description: isTh ? 'บริการตรวจวินิจฉัยและห้องปฏิบัติการที่ทันสมัยเพื่อการประเมินที่แม่นยำ' : 'State-of-the-art imaging and laboratory services for accurate diagnosis.' }
  ];

  const mockFaqs: Faq[] = [
    { id: 'f1', question: isTh ? 'เวลาทำการคือเมื่อไหร่?' : 'What are your visiting hours?', answer: isTh ? 'เวลาเยี่ยมทั่วไปคือ 09.00 ถึง 20.00 น. ทุกวัน หอผู้ป่วยวิกฤตมีเวลาจำกัด' : 'General visiting hours are from 9:00 AM to 8:00 PM daily. Intensive care units have restricted hours.' },
    { id: 'f2', question: isTh ? 'คุณรับประกันภัยของฉันหรือไม่?' : 'Do you accept my insurance?', answer: isTh ? 'เรารับประกันภัยส่วนใหญ่ โปรดติดต่อแผนกบัญชีเพื่อตรวจสอบความคุ้มครอง' : 'We accept most major insurance providers. Please contact our billing department to verify your specific coverage.' },
    { id: 'f3', question: isTh ? 'จะเข้าถึงประวัติการรักษาได้อย่างไร?' : 'How can I access my medical records?', answer: isTh ? 'คุณสามารถเข้าถึงผ่านระบบออนไลน์ด้วยอีเมลที่ลงทะเบียนไว้' : 'You can securely access your records through our online patient portal using your registered email.' },
    { id: 'f4', question: isTh ? 'จอดรถฉุกเฉินได้ที่ไหน?' : 'Where should I park for the emergency room?', answer: isTh ? 'มีลานจอดรถเฉพาะสำหรับกรณีฉุกเฉินติดกับทางเข้า ER' : 'There is a dedicated parking lot for emergency vehicles and patients immediately adjacent to the ER entrance.' }
  ];

  return { mockDoctors, mockDepartments, mockServices, mockFaqs };
};
