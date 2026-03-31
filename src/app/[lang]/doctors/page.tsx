import { prisma } from '@/lib/prisma';
import DoctorsClient from './DoctorsClient';

export default async function DoctorsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const doctors = await prisma.doctor.findMany({ orderBy: { createdAt: 'desc' } });
  
  // Extract unique departments/specialties from the doctors mapping to an ID and name format
  const uniqueSpecialties = Array.from(new Set(doctors.map(d => d.specialty)));
  const departments = uniqueSpecialties.map(name => ({ id: name, name }));

  return <DoctorsClient initialDoctors={doctors} departments={departments} lang={lang} />;
}
