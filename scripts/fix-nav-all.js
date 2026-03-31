const fs = require('fs');

const files = [
  'src/app/[lang]/rooms/page.tsx',
  'src/app/[lang]/articles/[id]/page.tsx',
  'src/app/[lang]/articles/page.tsx',
  'src/app/[lang]/contact/page.tsx',
  'src/app/[lang]/departments/page.tsx'
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
