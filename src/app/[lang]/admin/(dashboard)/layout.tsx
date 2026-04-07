import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ShieldPlus } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  if (!session) {
    redirect(`/${lang}/admin/login`);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Persistent Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shadow-sm z-10 shrink-0">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3 text-primary">
          <ShieldPlus className="h-8 w-8 text-secondary" />
          <span className="text-xl font-bold tracking-tight text-gray-900">Admin CMS</span>
        </div>
        
        <AdminSidebar lang={lang} />

        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-500 mb-3 px-4 font-medium uppercase tracking-wider">บัญชีผู้ใช้</p>
          <p className="text-sm font-bold text-gray-800 px-4 mb-4 truncate">{session.user?.email}</p>
          <LogoutButton />
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 w-full overflow-x-hidden p-6 md:p-10">
        {children}
      </div>
    </div>
  );
}
