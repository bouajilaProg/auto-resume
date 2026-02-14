import { useState } from "react";
import { RESUME_TIPS } from "@/constants/tips";
import { Lightbulb } from "lucide-react";

export default function Loading() {
  const [tip] = useState(() => RESUME_TIPS[Math.floor(Math.random() * RESUME_TIPS.length)]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50/50 items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center justify-center gap-12 max-w-2xl w-full">
        
        <div className="relative w-48 h-48">
          <div className="absolute top-0 left-0 w-full h-full border-[10px] border-gray-100 rounded-full shadow-inner"></div>
          <div className="absolute top-0 left-0 w-full h-full border-[10px] border-indigo-600 rounded-full border-t-transparent animate-spin shadow-indigo-200"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-gray-900 font-black text-5xl tracking-tight animate-pulse">
            Preparing Workspace
          </h2>
          <p className="text-gray-400 text-2xl font-medium tracking-wide">
            Getting your section ready...
          </p>
        </div>

        {tip && (
          <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col items-center gap-6">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl shadow-sm">
                <Lightbulb size={28} />
              </div>
              <div className="space-y-3 max-w-lg">
                <p className="text-[12px] font-black uppercase tracking-[0.2em] text-indigo-400">Pro Tip</p>
                <p className="text-gray-600 font-semibold text-xl leading-relaxed italic">
                  &ldquo;{tip}&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
