import { Monitor, Smartphone } from "lucide-react";

export default function MobileBlocker() {
  return (
    <div className="flex flex-col items-center gap-6 max-w-sm">
      <div className="p-4 bg-primary-500/10 rounded-2xl text-primary-400 ring-1 ring-primary-500/20">
        <Smartphone size={48} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black tracking-tight">Desktop Only Experience</h2>
        <p className="text-gray-400 text-sm leading-relaxed font-medium">
          AutoResume is precision-engineered for professional resume crafting, which requires a larger canvas.
        </p>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-500">
        <Monitor size={12} />
        Please switch to a computer
      </div>
    </div>
  );
}
