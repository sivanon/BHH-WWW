const fs = require('fs');

const paths = [
  'src/components/ai',
  'src/components/home/BannerAIClick.tsx'
];

paths.forEach(p => {
  if (fs.existsSync(p)) {
    if (fs.lstatSync(p).isDirectory()) {
      fs.rmSync(p, { recursive: true, force: true });
      console.log('Deleted directory:', p);
    } else {
      fs.unlinkSync(p);
      console.log('Deleted file:', p);
    }
  } else {
    console.log('Path not found:', p);
  }
});
