import ResumeList from "./components/ResumeList";
import { Layout, Sparkles } from "lucide-react";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Top Navigation */}
      <nav className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Layout size={20} />
            </div>
            <span className="font-black text-xl tracking-tight text-gray-900">AutoResume</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">Documentation</button>
            <div className="w-px h-4 bg-gray-200" />
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-bold text-sm hover:bg-indigo-100 transition-all">
              <Sparkles size={16} />
              Upgrade Pro
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Your Resumes</h1>
          <p className="text-gray-500 font-medium">Manage and create multiple versions of your professional profile.</p>
        </div>
        
        <ResumeList />
      </main>
    </div>
  );
}
