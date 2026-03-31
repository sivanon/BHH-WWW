const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seeds = [
  { indicator: 1, oitCode: 'O1', name: 'โครงสร้างหน่วยงาน', url: '#', size: '1.2 MB' },
  { indicator: 1, oitCode: 'O2', name: 'ข้อมูลผู้บริหาร', url: '#', size: '800 KB' },
  { indicator: 1, oitCode: 'O3', name: 'อำนาจหน้าที่', url: '#', size: '2.5 MB' },
  { indicator: 1, oitCode: 'O4', name: 'แผนยุทธศาสตร์หรือแผนพัฒนาหน่วยงาน', url: '#', size: '2.1 MB' },
  { indicator: 1, oitCode: 'O5', name: 'ข้อมูลการติดต่อ', url: '#', size: '100 KB' },
  { indicator: 1, oitCode: 'O6', name: 'กฎหมายที่เกี่ยวข้อง', url: '#', size: '2.2 MB' },
  { indicator: 1, oitCode: 'O7', name: 'ข่าวประชาสัมพันธ์', url: '#', size: '1.5 MB' },
  { indicator: 1, oitCode: 'O8', name: 'Q&A', url: '#', size: '250 KB' },
  { indicator: 1, oitCode: 'O9', name: 'Social Network', url: '#', size: '150 KB' },
  { indicator: 1, oitCode: 'O10', name: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)', url: '#', size: '800 KB' },
  { indicator: 2, oitCode: 'O11', name: 'แผนการจัดซื้อจัดจ้างหรือแผนการจัดหาพัสดุ', url: '#', size: '1.1 MB' },
  { indicator: 2, oitCode: 'O12', name: 'ประกาศต่าง ๆ เกี่ยวกับการจัดซื้อจัดจ้างหรือการจัดหาพัสดุ', url: '#', size: '3.4 MB' },
  { indicator: 2, oitCode: 'O13', name: 'สรุปผลการจัดซื้อจัดจ้างหรือการจัดหาพัสดุรายเดือน', url: '#', size: '2.1 MB' },
  { indicator: 2, oitCode: 'O14', name: 'รายงานผลการจัดซื้อจัดจ้างหรือการจัดหาพัสดุประจำปี', url: '#', size: '1.8 MB' },
  { indicator: 3, oitCode: 'O15', name: 'นโยบายการบริหารและพัฒนาทรัพยากรบุคคล', url: '#', size: '1.8 MB' },
  { indicator: 3, oitCode: 'O16', name: 'แผนการบริหารและพัฒนาทรัพยากรบุคคล', url: '#', size: '2.2 MB' },
  { indicator: 3, oitCode: 'O17', name: 'สรุปผลการบริหารและพัฒนาทรัพยากรบุคคล', url: '#', size: '1.5 MB' },
  { indicator: 3, oitCode: 'O18', name: 'หลักเกณฑ์การบริหารและพัฒนาทรัพยากรบุคคล', url: '#', size: '2.4 MB' },
  { indicator: 3, oitCode: 'O19', name: 'รายงานผลการบริหารและพัฒนาบุคลากรประจำปี', url: '#', size: '3.1 MB' },
  { indicator: 4, oitCode: 'O20', name: 'แผนการส่งเสริมความโปร่งใสและป้องกันการทุจริต', url: '#', size: '2.1 MB' },
  { indicator: 4, oitCode: 'O21', name: 'รายงานผลการดำเนินการตามแผนการส่งเสริมความโปร่งใส', url: '#', size: '1.4 MB' },
  { indicator: 4, oitCode: 'O22', name: 'คู่มือหรือแนวทางการปฏิบัติงานเพื่อป้องกันการทุจริต', url: '#', size: '3.5 MB' },
  { indicator: 4, oitCode: 'O23', name: 'ช่องทางและการจัดการเรื่องร้องเรียนการทุจริต', url: '#', size: '1.2 MB' },
  { indicator: 4, oitCode: 'O24', name: 'สรุปผลการจัดการเรื่องร้องเรียนการทุจริตประพฤติมิชอบ', url: '#', size: '800 KB' },
  { indicator: 5, oitCode: 'O25', name: 'ประกาศเจตนารมณ์นโยบาย No Gift Policy', url: '#', size: '1.1 MB' },
  { indicator: 5, oitCode: 'O26', name: 'การสร้างการตื่นรู้และประพฤติปฏิบัติตามนโยบาย No Gift Policy', url: '#', size: '4.2 MB' },
  { indicator: 5, oitCode: 'O27', name: 'รายงานผลการรับของขวัญและของกำนัลตามนโยบาย No Gift Policy', url: '#', size: '850 KB' },
  { indicator: 5, oitCode: 'O28', name: 'แนวปฏิบัติการรับหรือให้ของขวัญ ทรัพย์สิน หรือประโยชน์อื่นใด', url: '#', size: '1.2 MB' },
  { indicator: 6, oitCode: 'O29', name: 'แนวปฏิบัติการใช้ทรัพย์สินของราชการ', url: '#', size: '2.8 MB' },
  { indicator: 6, oitCode: 'O30', name: 'คู่มือการยืมทรัพย์สินของราชการเพื่อใช้ปฏิบัติงาน', url: '#', size: '1.5 MB' },
  { indicator: 6, oitCode: 'O31', name: 'สรุปผลการตรวจสอบการใช้ทรัพย์สินของหน่วยงาน', url: '#', size: '2.1 MB' },
  { indicator: 7, oitCode: 'O32', name: 'แนวทางการประเมินความเสี่ยงการทุจริตประจำปี', url: '#', size: '1.1 MB' },
  { indicator: 7, oitCode: 'O33', name: 'รายงานการประเมินความเสี่ยงการทุจริตประจำปี', url: '#', size: '4.5 MB' },
  { indicator: 7, oitCode: 'O34', name: 'มาตรการจัดการความเสี่ยงการทุจริต', url: '#', size: '2.3 MB' },
  { indicator: 7, oitCode: 'O35', name: 'แผนปฏิบัติการป้องกันการทุจริตประจำปี', url: '#', size: '3.1 MB' },
  { indicator: 7, oitCode: 'O36', name: 'รายงานผลการดำเนินการป้องกันการทุจริตประจำปี', url: '#', size: '3.2 MB' },
  { indicator: 8, oitCode: 'O37', name: 'คู่มือการป้องกันผลประโยชน์ทับซ้อน (Conflict of Interest)', url: '#', size: '2.4 MB' },
  { indicator: 8, oitCode: 'O38', name: 'การจัดการความขัดแย้งทางผลประโยชน์', url: '#', size: '1.1 MB' },
  { indicator: 8, oitCode: 'O39', name: 'รายงานผลการดำเนินการป้องกันผลประโยชน์ทับซ้อน', url: '#', size: '1.8 MB' },
  { indicator: 9, oitCode: 'O40', name: 'การกำหนดวัฒนธรรมองค์กรตามมาตรฐานจริยธรรม', url: '#', size: '1.6 MB' },
  { indicator: 9, oitCode: 'O41', name: 'กิจกรรมการส่งเสริมวัฒนธรรมองค์กรต่อต้านการทุจริต', url: '#', size: '5.6 MB' },
  { indicator: 9, oitCode: 'O42', name: 'แนวปฏิบัติการเผยแพร่ข้อมูลต่อสาธารณะของการสร้างวัฒนธรรม', url: '#', size: '1.2 MB' },
  { indicator: 9, oitCode: 'O43', name: 'รายงานผลการเสริมสร้างวัฒนธรรมองค์กรประจำปี', url: '#', size: '2.1 MB' }
];

async function main() {
  const count = await prisma.oitDocument.count();
  if (count === 0) {
    console.log('Seeding 43 OIT documents...');
    for (const s of seeds) {
      await prisma.oitDocument.create({ data: s });
    }
    console.log('Seed complete.');
  } else {
    console.log('Database already has records, skipping seed.');
  }
}
main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
