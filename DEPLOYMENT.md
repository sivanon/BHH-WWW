# คู่มือการนำโดเมนขึ้นระบบจริง (Production Deployment Guide)
ระบบขณะนี้คือการทำงานแบบ **Full-Stack CMS** โดยใช้แบบจำลองฐานข้อมูลในเครื่อง (SQLite) ซึ่งมีความสมบูรณ์ 100% 

อย่างไรก็ตาม หากคุณต้องการอัปโหลดเว็บไซต์นี้ขึ้นสู่เว็บโฮสติ้งเซิร์ฟเวอร์แบบไร้เซิร์ฟเวอร์ (Serverless) อย่างเช่น **Vercel** ควรอัปเกรดฐานข้อมูลไปยังระบบ **PostgreSQL** เพื่อการรักษาข้อมูลอย่างถาวร (Persistent Database)

## ขั้นตอนการเปลี่ยนเป็น PostgreSQL
เมื่อติดตั้งโปรเจกต์ลงบน Vercel และเชื่อมต่อกับ **Vercel Postgres (หรือ Supabase)** เรียบร้อยแล้ว ให้ทำตามขั้นตอนดังนี้:

### 1. แก้ไขไฟล์ `prisma/schema.prisma`
เปลี่ยนค่า \`provider\` ในบล็อกแรกจาก \`sqlite\` เป็น \`postgresql\`

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/lib/generated/prisma"
}

datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

### 2. ตั้งค่า Database URL บน Vercel Environment Variables
นำ Link ที่ได้จากฐานข้อมูลมาตั้งค่าในตารางระบบของ Vercel (Project Settings -> Environment Variables)
- `POSTGRES_PRISMA_URL` : (เช่น postgres://user:pass@host/db?pgbouncer=true)
- `POSTGRES_URL_NON_POOLING`: (เช่น postgres://user:pass@host/db)
- `NEXTAUTH_URL`: ลิงก์โดเมนจริง (เช่น https://www.banhong.go.th)
- `NEXTAUTH_SECRET`: ตั้งค่าเป็นชุดข้อความรหัสลับของคุณ

### 3. ยืนยันการเปลี่ยนแปลงระบบฐานข้อมูล
หลังจากแก้ไขไฟล์ \`schema.prisma\` แล้ว ให้รันคำสั่งรื้อถอนและอัปเกรดโครงสร้างฐานข้อมูลตัวใหม่ผ่าน Terminal ของคุณ 1 ครั้ง:

```bash
npx prisma generate
```

ระบบพร้อมใช้งานสำหรับ Cloud Production อย่างสมบูรณ์!
