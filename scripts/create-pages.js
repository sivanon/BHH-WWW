const fs = require('fs');

const content = `import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar lang={lang as any} />
      <main className="flex-grow flex items-center justify-center bg-gray-50/50">
        <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-extrabold text-gray-400 mb-4">อยู่ระหว่างการปรับปรุงข้อมูล</h1>
          <p className="text-gray-500 font-medium text-lg">Coming Soon</p>
        </div>
      </main>
      <Footer lang={lang as any} />
    </div>
  );
}`;

const dirs = [
  'src/app/[lang]/about/executives',
  'src/app/[lang]/about/policies',
  'src/app/[lang]/about/vision',
  'src/app/[lang]/about/structure',
  'src/app/[lang]/about/pdpa',
  'src/app/[lang]/projects'
];

dirs.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dir + '/page.tsx', content);
  console.log('Created:', dir);
});
