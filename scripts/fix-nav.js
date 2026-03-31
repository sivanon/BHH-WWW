const fs = require('fs');

const files = [
  'src/app/[lang]/about/executives/page.tsx',
  'src/app/[lang]/about/policies/page.tsx',
  'src/app/[lang]/about/vision/page.tsx',
  'src/app/[lang]/about/pdpa/page.tsx',
  'src/app/[lang]/about/structure/page.tsx',
  'src/app/[lang]/projects/page.tsx',
  'src/app/[lang]/ita/page.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/import\s+Navbar\s+from\s+['"]@\/components\/layout\/Navbar['"];?\r?\n/g, '');
    content = content.replace(/import\s+Footer\s+from\s+['"]@\/components\/layout\/Footer['"];?\r?\n/g, '');
    content = content.replace(/<Navbar[^>]*>\r?\n?/g, '');
    content = content.replace(/<Footer[^>]*>\r?\n?/g, '');
    fs.writeFileSync(f, content);
    console.log('Fixed:', f);
  } else {
    console.log('Could not find:', f);
  }
});
