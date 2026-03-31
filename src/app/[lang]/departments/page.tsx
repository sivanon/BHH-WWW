import { getMockData } from '@/lib/mockData';
import { getDictionary, Locale } from '@/i18n/dictionaries';
import { Heart, Brain, Baby, Bone, Activity } from 'lucide-react';

const iconMap: Record<string, any> = {
  Heart,
  Brain,
  Baby,
  Bone,
  Activity
};

export default async function DepartmentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const t = getDictionary(lang).depts;
  const { mockDepartments } = getMockData(lang);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">{t.title}</h1>
        <p className="text-xl text-gray-600">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockDepartments.map(dept => {
          const IconComponent = iconMap[dept.iconName];
          return (
            <div key={dept.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center text-primary mb-6">
                {IconComponent && <IconComponent className="h-8 w-8" />}
              </div>
              <h2 className="text-2xl font-bold mb-3">{dept.name}</h2>
              <p className="text-gray-600 mb-6">{dept.description}</p>
              <a href={`/${lang}/doctors?specialty=${dept.name}`} className="text-secondary font-medium hover:underline inline-flex items-center">
                {t.findSpec.replace('{dept}', dept.name)} &rarr;
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
