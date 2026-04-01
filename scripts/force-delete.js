const fs = require('fs');

const targets = [
  'src/app/[lang]/complaints',
  'src/app/[lang]/admin/complaints',
  'src/app/actions/complaints.ts'
];

targets.forEach(t => {
  try {
    fs.rmSync(t, { recursive: true, force: true });
    console.log('Removed:', t);
  } catch (e) {}
});
