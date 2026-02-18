"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Layout, 
  FileText, 
  ChevronRight
} from "lucide-react";
import { ALL_SECTIONS, SECTION_ICONS, SECTION_LABELS, SECTION_PATHS } from "@/constants/sections";

export default function Sidebar() {
  const pathname = usePathname();

  const isEditorPage = pathname === "/main";
  
  const navItems = [
    { label: "Editor", href: "/main", icon: FileText, active: isEditorPage },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shrink-0 z-50">
      {/* Brand */}
      <Link href="/main" className="h-16 flex items-center gap-3 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
        <div className="p-2 bg-indigo-600 rounded-lg text-white">
          <Layout size={20} />
        </div>
        <span className="font-black text-xl tracking-tight text-gray-900">AutoResume</span>
      </Link>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        {/* Main Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                item.active 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={item.active ? "text-indigo-600" : "text-gray-400"} />
                {item.label}
              </div>
              {item.active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
            </Link>
          ))}
        </nav>

        {/* Data Library Sub-menu */}
        <div className="space-y-3">
          <Link 
            href="/sections"
            className={`flex items-center justify-between px-3 text-[10px] font-black uppercase tracking-widest transition-colors ${
              pathname.startsWith("/sections") ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Data Sections
            <ChevronRight size={10} />
          </Link>
          <nav className="space-y-1">
            {ALL_SECTIONS.map((sectionId) => {
              const Icon = SECTION_ICONS[sectionId];
              const path = `/sections/${SECTION_PATHS[sectionId]}`;
              const isActive = pathname === path;
              
              return (
                <Link
                  key={sectionId}
                  href={path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    isActive 
                      ? "text-indigo-600 bg-indigo-50/50" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-indigo-600" : "text-gray-400"} />
                  {SECTION_LABELS[sectionId]}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
