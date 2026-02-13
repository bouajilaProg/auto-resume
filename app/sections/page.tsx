
import Link from "next/link";
import { ALL_SECTIONS, SECTION_ICONS, SECTION_LABELS, SECTION_PATHS } from "@/constants/sections";

export default function Sections() {
  const sections = ALL_SECTIONS.map((id) => ({
    id: SECTION_PATHS[id],
    name: SECTION_LABELS[id],
    icon: SECTION_ICONS[id],
  }));
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:pt-40">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Resume Builder
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Select a section to edit your professional details and build your perfect resume.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.id}
                href={`/sections/${section.id}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 flex flex-col items-center justify-center gap-5 group border border-gray-100"
              >
                <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                  <Icon size={40} />
                </div>
                <span className="text-gray-800 font-bold text-center text-lg">
                  {section.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
