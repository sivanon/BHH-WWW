"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/th/admin/login' })}
      className="w-full flex items-center px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-lg transition-colors"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </button>
  );
}
