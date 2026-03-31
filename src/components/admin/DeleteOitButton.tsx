"use client";
import { Trash2 } from "lucide-react";
import { deleteOitDocument } from "@/app/actions/ita";
import toast from "react-hot-toast";

export default function DeleteOitButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบเอกสารนี้? ข้อมูลจะหายไปจากหน้าเว็บไซต์ทันที")) {
      const res = await deleteOitDocument(id);
      if (res.success) {
         toast.success("ลบเอกสารออกจากระบบแล้ว");
      } else {
         toast.error("ลบเอกสารไม่สำเร็จ");
      }
    }
  };
  return (
    <button onClick={handleDelete} className="text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-colors shadow-sm border border-transparent hover:border-red-100" title="ลบเอกสาร">
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
