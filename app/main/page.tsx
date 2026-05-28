"use client";

import useResumeEditor from "@/hooks/useResumeEditor";
import EditorPane from "./components/EditorPane";
import PreviewPane from "./components/PreviewPane";
import Loading from "@/app/components/Loading";
import { useModal } from "@/context/Modal/useModal";
import ModalCreator from "@/context/Modal/modals/ModelsFactory";
import { Plus, MoreVertical, Trash2, Edit3, X, Copy } from "lucide-react";
import { useState, useMemo } from "react";
import Image from "next/image";

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
    moveItem,
    save,
    cancel,
    setActiveConfigId,
    createNewConfig,
    duplicateConfig,
    deleteConfig,
    renameConfig,
    loading
  } = useResumeEditor();

  const [showConfigMenu, setShowConfigMenu] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [tempName, setTempName] = useState("");
  const { openModal, closeModal } = useModal();

  const handleRename = () => {
    if (tempName.trim()) {
      renameConfig(activeConfig.id, tempName.trim());
      setIsRenaming(false);
    }
  };

  const DeleteVersionModal = useMemo(
    () =>
      ModalCreator(
        "DeleteVersion",
        closeModal,
        () => {
          deleteConfig(activeConfig.id);
          setShowConfigMenu(false);
        }
      ),
    [closeModal, activeConfig.id, deleteConfig, setShowConfigMenu]
  );

  const CreateVersionModal = useMemo(
    () => ModalCreator("CreateVersion", closeModal, undefined, (name: string) => {
      createNewConfig(name);
    }),
    [closeModal, createNewConfig]
  );

  const handleDelete = () => {
    if (configs.length <= 1) return;
    openModal(DeleteVersionModal);
  };

  const openCreateVersionModal = () => {
    openModal(CreateVersionModal);
  };

  if (loading || !masterData || !activeConfig) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar - Config Management (Narrow) */}
      <div className="w-20 flex flex-col items-center py-6 border-r border-gray-200 bg-gray-50 shrink-0">
        <div className="relative w-12 h-12 bg-primary-600 rounded-2xl overflow-hidden shadow-md flex items-center justify-center mb-10 group cursor-pointer hover:scale-105 transition-transform">
          <Image 
            src="/mainLogo.png" 
            alt="Logo" 
            width={48} 
            height={48}
            className="object-cover scale-125"
          />
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
                ? "bg-primary-100 text-primary-600 shadow-sm ring-1 ring-primary-200"
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
            onClick={openCreateVersionModal}
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-gray-400 hover:bg-primary-50 hover:text-primary-600 border border-gray-200 border-dashed transition-all"
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
                className="flex-1 bg-gray-50 border border-primary-300 rounded px-2 py-1 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-200"
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
                  <h1 className="text-lg font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">
                    {activeConfig.name.toUpperCase()}
                  </h1>
                  <Edit3 size={14} className="text-gray-300 group-hover:text-primary-400 transition-colors" />
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
                <div className="absolute top-14 right-6 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => {
                      setTempName(activeConfig.name);
                      setIsRenaming(true);
                      setShowConfigMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Edit3 size={16} className="text-gray-400" />
                    Rename Version
                  </button>
                  <div className="h-px bg-gray-100 my-1" />
                  <button
                    onClick={() => {
                      duplicateConfig();
                      setShowConfigMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Copy size={16} className="text-gray-400" />
                    Duplicate Version
                  </button>
                  <div className="h-px bg-gray-100 my-1" />
                  <button
                    onClick={handleDelete}
                    disabled={configs.length <= 1}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <Trash2 size={16} />
                    Delete Version
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
          moveItem={moveItem}
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
