"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, UserCircle, BookOpen, ShieldCheck, PenTool } from "lucide-react";

export default function AdminSidebar({ lang }: { lang: string }) {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "ภาพรวมระบบ (OVERVIEW)",
      links: [
        { href: `/${lang}/admin`, label: "แดชบอร์ด (Dashboard)", icon: LayoutDashboard },
      ],
    },
    {
      title: "จัดการเนื้อหา (CONTENT CMS)",
      links: [
        { href: `/${lang}/admin/news`, label: "ข่าวสารและประกาศ", icon: FileText },
        { href: `/${lang}/admin/articles`, label: "บทความสุขภาพ", icon: BookOpen },
        { href: `/${lang}/admin/pages`, label: "หน้าเพจองค์กร (Pages)", icon: PenTool },
      ],
    },
    {
      title: "บุคลากร & เอกสาร (INTERNAL)",
      links: [
        { href: `/${lang}/admin/doctors`, label: "ทำเนียบแพทย์", icon: UserCircle },
        { href: `/${lang}/admin/ita`, label: "ศูนย์ข้อมูล ITA", icon: ShieldCheck },
      ],
    }
  ];

  return (
    <nav className="flex-1 space-y-6 p-5 overflow-y-auto w-full">
      {menuGroups.map((group, groupIdx) => (
        <div key={groupIdx} className="flex flex-col space-y-2">
          <h4 className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-1 px-3">
            {group.title}
          </h4>
          <div className="space-y-1">
            {group.links.map((link) => {
              const isActive = 
                link.href === `/${lang}/admin` 
                  ? pathname === link.href
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3.5 rounded-xl text-[0.95rem] font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <link.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
