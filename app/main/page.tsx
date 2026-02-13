"use client";

import useResumeEditor from "@/hooks/useResumeEditor";
import EditorPane from "./components/EditorPane";
import PreviewPane from "./components/PreviewPane";
import { Loader2, Settings, Plus, Layout, MoreVertical, Trash2, Edit3, X } from "lucide-react";
import { useState } from "react";

export default function ResumeMainPage() {
  const {
    masterData,
    activeConfig,
    configs,
    assembledResume,
    isDirty,
    toggleItem,
    toggleAll,
    moveSection,
    save,
    cancel,
    setActiveConfigId,
    createNewConfig,
    deleteConfig,
    renameConfig,
    loading
  } = useResumeEditor();

  const [showConfigMenu, setShowConfigMenu] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [tempName, setTempName] = useState("");

  if (loading || !masterData || !activeConfig) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Loading your resume editor...</p>
      </div>
    );
  }

  const handleRename = () => {
    if (tempName.trim()) {
      renameConfig(activeConfig.id, tempName.trim());
      setIsRenaming(false);
    }
  };

  const handleDelete = () => {
    if (configs.length > 1 && confirm(`Delete "${activeConfig.name}"?`)) {
      deleteConfig(activeConfig.id);
      setShowConfigMenu(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar - Config Management (Narrow) */}
      <div className="w-16 flex flex-col items-center py-4 border-r border-gray-200 bg-gray-50 shrink-0">
        <div className="p-2 mb-8 bg-indigo-600 rounded-xl text-white">
          <Layout size={24} />
        </div>

        <div className="flex flex-col gap-4">
          {configs.map(config => (
            <button
              key={config.id}
              onClick={() => {
                setActiveConfigId(config.id);
                setIsRenaming(false);
                setShowConfigMenu(false);
              }}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all relative ${activeConfig.id === config.id
                ? "bg-indigo-100 text-indigo-600 shadow-sm ring-1 ring-indigo-200"
                : "bg-white text-gray-400 hover:bg-gray-100 border border-gray-200"
                }`}
              title={config.name}
            >
              <span className="text-xs font-bold uppercase">{config.name.substring(0, 2)}</span>
              {activeConfig.id === config.id && isDirty && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-gray-50" />
              )}
            </button>
          ))}

          <button
            onClick={() => {
              const name = prompt("Enter resume name:");
              if (name) createNewConfig(name);
            }}
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200 border-dashed transition-all"
            title="Create New Resume"
          >
            <Plus size={20} />
          </button>
        </div>

      </div>

      {/* Left Pane - Editor (35%) */}
      <div className="w-[35%] flex flex-col border-r border-gray-200">
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0 relative">
          {isRenaming ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                autoFocus
                className="flex-1 bg-gray-50 border border-indigo-300 rounded px-2 py-1 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename();
                  if (e.key === "Escape") setIsRenaming(false);
                }}
              />
              <button onClick={handleRename} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded">
                <Plus size={18} />
              </button>
              <button onClick={() => setIsRenaming(false)} className="p-1 text-gray-400 hover:bg-gray-50 rounded">
                <X size={18} />
              </button>
            </div>
          ) : (
            <>
              <div 
                className="flex flex-col cursor-pointer group"
                onClick={() => {
                  setTempName(activeConfig.name);
                  setIsRenaming(true);
                }}
              >
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                    {activeConfig.name.toUpperCase()}
                  </h1>
                  <Edit3 size={14} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
                </div>
                {isDirty && (
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                      Unsaved Changes
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConfigMenu(!showConfigMenu)}
                  className={`p-2 rounded-lg transition-colors ${showConfigMenu ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:bg-gray-50"}`}
                >
                  <MoreVertical size={20} />
                </button>
              </div>

              {showConfigMenu && (
                <div className="absolute top-14 right-6 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => {
                      setTempName(activeConfig.name);
                      setIsRenaming(true);
                      setShowConfigMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Edit3 size={16} className="text-gray-400" />
                    Rename Resume
                  </button>
                  <div className="h-px bg-gray-100 my-1" />
                  <button
                    onClick={handleDelete}
                    disabled={configs.length <= 1}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <Trash2 size={16} />
                    Delete Resume
                  </button>
                </div>
              )}
            </>
          )}
        </header>

        <EditorPane
          masterData={masterData}
          activeConfig={activeConfig}
          toggleItem={toggleItem}
          toggleAll={toggleAll}
          moveSection={moveSection}
        />
      </div>

      {/* Right Pane - Preview (Remaining) */}
      <div className="flex-1 flex flex-col">
        <PreviewPane
          resume={assembledResume}
          isDirty={isDirty}
          onSave={save}
          onCancel={cancel}
        />
      </div>
    </div>
  );
}
