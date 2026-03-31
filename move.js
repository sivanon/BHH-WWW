const fs = require('fs');
fs.mkdirSync('src/app/[lang]', { recursive: true });
const moves = [
  ['src/app/page.tsx', 'src/app/[lang]/page.tsx'],
  ['src/app/layout.tsx', 'src/app/[lang]/layout.tsx'],
  ['src/app/departments', 'src/app/[lang]/departments'],
  ['src/app/doctors', 'src/app/[lang]/doctors'],
  ['src/app/appointment', 'src/app/[lang]/appointment'],
  ['src/app/contact', 'src/app/[lang]/contact']
];
moves.forEach(([src, dest]) => {
  if (fs.existsSync(src)) {
    fs.renameSync(src, dest);
  }
});
console.log('Moved files');
