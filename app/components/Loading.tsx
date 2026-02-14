import { useEffect, useState } from "react";
import { RESUME_TIPS } from "@/constants/tips";
import { Lightbulb } from "lucide-react";

export default function Loading() {
  const [tip, setTip] = useState("");

  useEffect(() => {
    const randomTip = RESUME_TIPS[Math.floor(Math.random() * RESUME_TIPS.length)];
    setTip(randomTip);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50/50 items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl p-12 flex flex-col items-center justify-center gap-10 shadow-xl shadow-gray-200/50 border border-gray-100">
        
        <div className="relative w-40 h-40">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-50 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-gray-900 font-black text-4xl tracking-tight">
            Preparing Workspace
          </h2>
          <p className="text-gray-500 text-xl font-medium">
            Getting your section ready...
          </p>
        </div>

        {tip && (
          <div className="w-full bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0">
                <Lightbulb size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Pro Tip</p>
                <p className="text-gray-700 font-medium leading-relaxed italic">
                  "{tip}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
