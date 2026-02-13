"use client";

import Link from "next/link";
import {
  ChevronUp,
  ChevronDown,
  Plus,
  CheckCircle2,
  Circle,
  FolderKanban,
  LucideIcon
} from "lucide-react";

import { useMemo } from "react";
import { SECTION_ICONS, SECTION_LABELS, SECTION_PATHS, ALL_SECTIONS } from "@/constants/sections";
import { Resume, ResumeConfig, SectionType, SectionTypeValue, Skills } from "@/types/resumeTypes";

interface EditorPaneProps {
  masterData: Resume;
  activeConfig: ResumeConfig;
  toggleItem: (sectionType: SectionTypeValue, itemId: number, subType?: string) => void;
  toggleAll: (sectionType: SectionTypeValue, itemIds: number[], subType?: string, forceState?: boolean) => void;
  moveSection: (index: number, direction: "up" | "down") => void;
}

interface IdentifiableItem {
  id: number;
  [key: string]: any;
}

export default function EditorPane({ masterData, activeConfig, toggleItem, toggleAll, moveSection }: EditorPaneProps) {
  const sectionOrder = useMemo(() => {
    const order = [...activeConfig.sectionOrder];
    // Ensure all sections from ALL_SECTIONS (except personalInfo) are present
    ALL_SECTIONS.forEach(id => {
      if (id !== "personalInfo" && !order.includes(id as any)) {
        order.push(id as any);
      }
    });
    return order;
  }, [activeConfig.sectionOrder]);

  const UserIcon = SECTION_ICONS.personalInfo;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 space-y-6 custom-scrollbar">
      {/* Personal Info - Fixed at top */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <UserIcon size={18} />
            </div>
            <h2 className="font-bold text-gray-800 text-lg">Personal Information</h2>
          </div>
          <Link
            href="/sections/personal-info"
            className="p-1.5 hover:bg-gray-200 rounded-md transition-colors text-gray-400 hover:text-indigo-600"
          >
            <Plus size={18} />
          </Link>
        </div>
        <div className="p-5 space-y-1">
          <p className="font-semibold text-gray-900">{masterData.personalInfo?.name || "No name set"}</p>
          <p className="text-sm text-gray-500">{masterData.personalInfo?.location}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {masterData.personalInfo?.contact.map(c => (
              <span key={c.id} className="text-xs text-indigo-600 font-medium">{c.value}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {sectionOrder.map((sectionType, index) => {
        const section = masterData.sections.find(s => s.type === sectionType) || {
          type: sectionType,
          body: sectionType === SectionType.Skills ? { languages: [], technologies: [], softSkills: [] } : []
        };

        const Icon = SECTION_ICONS[sectionType] || FolderKanban;
        const label = SECTION_LABELS[sectionType] || sectionType;
        const path = SECTION_PATHS[sectionType] || sectionType;

        const allIds = sectionType === SectionType.Skills
          ? []
          : Array.isArray(section.body)
            ? (section.body as IdentifiableItem[]).map((item) => item.id)
            : [];

        const isAllSelected = sectionType !== SectionType.Skills && allIds.length > 0 && allIds.every(id => {
          const key = sectionType as keyof Omit<ResumeConfig['selectedItems'], 'skills'>;
          return (activeConfig.selectedItems[key] || []).includes(id);
        });

        const isEmpty = sectionType === SectionType.Skills
          ? (Object.values(section.body as Skills).every(arr => arr.length === 0))
          : Array.isArray(section.body) && section.body.length === 0;

        return (
          <section key={sectionType} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Icon size={18} />
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold text-gray-800 text-lg leading-tight">{label}</h2>
                  {sectionType !== SectionType.Skills && Array.isArray(section.body) && section.body.length > 0 && (
                    <button
                      onClick={() => toggleAll(sectionType, allIds)}
                      className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 hover:text-indigo-700 text-left mt-0.5"
                    >
                      {isAllSelected ? "Deselect All" : "Select All"}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/sections/${path}`}
                  className="p-1.5 hover:bg-gray-200 rounded-md transition-colors text-gray-400 hover:text-indigo-600 mr-2"
                >
                  <Plus size={18} />
                </Link>
                <div className="h-6 w-px bg-gray-200 mx-1" />
                <button
                  onClick={() => moveSection(index, "up")}
                  disabled={index === 0}
                  className="p-1.5 hover:bg-gray-200 rounded-md disabled:opacity-30 transition-colors text-gray-500"
                >
                  <ChevronUp size={18} />
                </button>
                <button
                  onClick={() => moveSection(index, "down")}
                  disabled={index === sectionOrder.length - 1}
                  className="p-1.5 hover:bg-gray-200 rounded-md disabled:opacity-30 transition-colors text-gray-500"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {sectionType === SectionType.Skills ? (
                isEmpty ? (
                  <Link
                    href={`/sections/${path}`}
                    className="flex flex-col items-center justify-center py-6 px-4 border-2 border-dashed border-gray-100 rounded-xl hover:bg-gray-50 hover:border-indigo-200 transition-all group/empty"
                  >
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover/empty:text-indigo-400">No skills added</p>
                    <p className="text-[10px] text-gray-300">Click to add skills to your profile</p>
                  </Link>
                ) : (
                  <div className="space-y-6">
                    {(['languages', 'technologies', 'softSkills'] as const).map(subType => {
                      const skillsBody = section.body as Skills;
                      const items = skillsBody[subType];
                      if (items.length === 0) return null;

                      const selectedIds = activeConfig.selectedItems.skills[subType];
                      const itemIds = items.map((i) => i.id);
                      const allSubSelected = itemIds.length > 0 && itemIds.every((id: number) => selectedIds.includes(id));

                      return (
                        <div key={subType} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.15em]">{subType}</h3>
                            <button
                              onClick={() => toggleAll(sectionType, itemIds, subType)}
                              className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-600"
                            >
                              {allSubSelected ? "Clear" : "Select All"}
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {items.map((item) => {
                              const isSelected = selectedIds.includes(item.id);
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => toggleItem(sectionType, item.id, subType)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${isSelected
                                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
                                    : "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
                                    }`}
                                >
                                  {isSelected ? <CheckCircle2 size={12} strokeWidth={3} /> : <Circle size={12} strokeWidth={3} />}
                                  {item.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : Array.isArray(section.body) ? (
                section.body.length === 0 ? (
                  <Link
                    href={`/sections/${path}`}
                    className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed border-gray-100 rounded-xl hover:bg-gray-50 hover:border-indigo-200 transition-all group/empty"
                  >
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover/empty:text-indigo-400">Section Empty</p>
                    <p className="text-[10px] text-gray-300">Click to add {label.toLowerCase()} entries</p>
                  </Link>
                ) : (
                  <div className="space-y-2">
                    {(section.body as IdentifiableItem[]).map((item) => {
                      const key = sectionType as keyof Omit<ResumeConfig['selectedItems'], 'skills'>;
                      const isSelected = (activeConfig.selectedItems[key] || []).includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItem(sectionType, item.id)}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer group/item ${isSelected
                            ? "bg-indigo-50/30 border-indigo-100 hover:border-indigo-200"
                            : "bg-white border-gray-100 opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                            }`}
                        >
                          <div className={`mt-0.5 ${isSelected ? "text-indigo-600" : "text-gray-300"}`}>
                            {isSelected ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                          </div>
                          <div className="flex-1">
                            <p className={`font-bold text-sm ${isSelected ? "text-gray-800" : "text-gray-500"}`}>
                              {item.jobTitle || item.degreeName || item.title || item.activityName || item.name}
                            </p>
                            <p className="text-xs text-gray-500 font-medium">
                              {item.company || item.institution || item.issuingOrganization || ""}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : (
                <p className="text-sm text-gray-400 italic">No items to display</p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
