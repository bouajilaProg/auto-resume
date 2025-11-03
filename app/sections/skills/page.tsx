"use client"
import { mockResumeData } from '@/db/mock-data';
import { useState } from 'react';
import { FaCode, FaCog, FaUsers } from 'react-icons/fa';
import SkillSection from './components/SkillsSection';
import { Skills, skillType } from '@/types/resumeTypes';
import Link from 'next/link';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skills>(mockResumeData.skills);

  const addSkill = (type: skillType) => (name: string) => {
    setSkills(prevSkills => {
      const skillList = prevSkills[type];
      // Generate the next sequential ID
      const newId = skillList.length > 0 ? Math.max(...skillList.map(s => s.id)) + 1 : 1;

      return {
        ...prevSkills,
        [type]: [...skillList, { id: newId, type, name }]
      };
    });
  };

  const removeSkill = (type: skillType) => (id: number) => {
    setSkills(prevSkills => ({
      ...prevSkills,
      [type]: prevSkills[type].filter(s => s.id !== id)
    }));
  };

  const updateSkill = (type: skillType) => (id: number, name: string) => {
    setSkills(prevSkills => ({
      ...prevSkills,
      [type]: prevSkills[type].map(s => s.id === id ? { ...s, name } : s)
    }));
  };

  const handleSave = () => {
    console.log("Saved Skills Data:", skills);
    alert("Changes saved! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Skills & Expertise</h1>
            <p className="text-gray-600">Manage your technical skills, languages, and soft skills</p>
          </div>

          <div className="space-y-6">
            <SkillSection
              title="Programming Languages"
              icon={<FaCode className="text-blue-600" />}
              skills={skills.languages}
              onAdd={addSkill(skillType.LANG)}
              onRemove={removeSkill(skillType.LANG)}
              onUpdate={updateSkill(skillType.LANG)}
            />

            <SkillSection
              title="Technologies & Tools"
              icon={<FaCog className="text-green-600" />}
              skills={skills.technologies}
              onAdd={addSkill(skillType.TECH)}
              onRemove={removeSkill(skillType.TECH)}
              onUpdate={updateSkill(skillType.TECH)}
            />

            <SkillSection
              title="Soft Skills"
              icon={<FaUsers className="text-purple-600" />}
              skills={skills.softSkills}
              onAdd={addSkill(skillType.SOFT)}
              onRemove={removeSkill(skillType.SOFT)}
              onUpdate={updateSkill(skillType.SOFT)}
            />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Save Changes
              </button>
              <Link
                href="/sections"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
