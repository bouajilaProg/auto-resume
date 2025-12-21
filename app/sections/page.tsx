
import Link from "next/link";
import {
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  Users,
  Award,
  Lightbulb,
  Network
} from "lucide-react";

export default function Sections() {
  const sections = [
    { id: "personal-info", name: "Personal Info", icon: User },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: Lightbulb },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "skills", name: "Skills", icon: Wrench },
    { id: "certifications", name: "Certifications", icon: Award },
    { id: "extracurricular", name: "Extracurricular", icon: Users },
    { id: " ", name: "To be filled", icon: Network }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Build Your CV
          </h1>
          <p className="text-gray-600">
            Select a section to edit
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.id}
                href={`/sections/${section.id}`}
                className="aspect-square bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col items-center justify-center gap-4 group"
              >
                <div className="text-blue-600 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={48} />
                </div>
                <span className="text-gray-700 font-medium text-center text-lg">
                  {section.name}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Click any section to start editing</p>
        </div>
      </div>
    </div>
  );
}
