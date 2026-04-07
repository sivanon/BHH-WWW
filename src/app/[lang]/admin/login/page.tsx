"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeartPulse } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      setLoading(false);
    } else {
      router.push("/th/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full text-primary">
            <HeartPulse className="w-10 h-10" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Hospital Admin Portal</h2>
        <p className="text-gray-500 text-center mb-8 text-sm">ส่วนสำหรับเจ้าหน้าที่จัดการระบบเท่านั้น (CMS)</p>
        
        {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><p className="text-red-700 text-sm font-medium">{error}</p></div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">ชื่อผู้ใช้งาน (Username)</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-3 px-4 border bg-gray-50"
              placeholder=""
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">รหัสผ่าน (Password)</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-3 px-4 border bg-gray-50"
              placeholder=""
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md mt-6"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ (Sign In)"}
          </button>
        </form>
      </div>
    </div>
  );
}
