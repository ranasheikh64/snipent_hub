"use client";

import React, { useState } from "react";
import { BrutalistButton } from "@/frontend/components/ui/BrutalistButton";
import { BrutalistInput } from "@/frontend/components/ui/BrutalistInput";
import { SnippetFileRow } from "./SnippetFileRow";
import { SnippetItem } from "@/frontend/types/snippet";
import { X, Plus, Link2 } from "lucide-react";

interface EditSnippetModalProps {
  snippet: SnippetItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

type FileEntry = { filename: string; language: string; code: string; purpose?: string };

const TECHS = ["Flutter","React","Next.js","Node.js","Python","Go","Rust","Swift","Kotlin","TypeScript","Dart"];
const CATS = ["UI Components","Authentication","Payment Gateway","Backend API","State Management","Networking","Database","Utils"];

export const EditSnippetModal: React.FC<EditSnippetModalProps> = ({
  snippet, isOpen, onClose, onUpdated
}) => {
  if (!isOpen || !snippet) return null;

  const [title, setTitle] = useState(snippet.title);
  const [description, setDescription] = useState(snippet.description || "");
  const [technology, setTechnology] = useState(snippet.technology);
  const [category, setCategory] = useState(snippet.category);
  const [visibility, setVisibility] = useState<"public"|"private">(snippet.isPublic ? "public" : "private");
  const [files, setFiles] = useState<FileEntry[]>(
    snippet.files.map(f => ({ ...f, purpose: f.purpose || "" }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFile = (i: number, patch: Partial<FileEntry>) => {
    const u = [...files]; u[i] = { ...u[i], ...patch }; setFiles(u);
  };

  const addFile = () => setFiles([...files, { filename: "component.dart", language: "dart", code: "", purpose: "" }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !files[0]?.code.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/snippets/${snippet.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, description, technology, category,
          isPublic: visibility === "public", files,
        }),
      });
      if (res.ok) { onUpdated(); onClose(); }
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        <div className="border-b-2 border-black p-4 bg-amber-300 flex items-center justify-between shrink-0">
          <h2 className="font-black text-lg uppercase tracking-wider text-black">✏️ Edit Code Snippet</h2>
          <button onClick={onClose} className="p-1 border border-black bg-white hover:bg-neutral-100 cursor-pointer">
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3 flex-1">
          <BrutalistInput placeholder="SNIPPET TITLE" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <div className="grid grid-cols-3 gap-2">
            <select value={technology} onChange={(e) => setTechnology(e.target.value)} className="bg-white border-2 border-black px-2 py-2 text-xs font-mono font-bold">
              {TECHS.map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-white border-2 border-black px-2 py-2 text-xs font-mono font-bold">
              {CATS.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={visibility} onChange={(e) => setVisibility(e.target.value as any)} className="bg-white border-2 border-black px-2 py-2 text-xs font-mono font-bold">
              <option value="public">🌐 Public (All)</option>
              <option value="private">🔒 Private (Me)</option>
            </select>
          </div>
          <textarea placeholder="SHORT DESCRIPTION..." value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full bg-white border-2 border-black p-2.5 text-xs font-mono focus:outline-none" />

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1">
                <Link2 className="w-3 h-3 text-[#7C3AED]" /> Linked Code Files ({files.length})
              </span>
              <button type="button" onClick={addFile} className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Add File
              </button>
            </div>
            <div className="space-y-3">
              {files.map((file, i) => (
                <SnippetFileRow
                  key={i} filename={file.filename} code={file.code} purpose={file.purpose}
                  fileIndex={i} totalFiles={files.length} canDelete={files.length > 1}
                  onFilenameChange={(v) => updateFile(i, { filename: v })}
                  onCodeChange={(v) => updateFile(i, { code: v })}
                  onPurposeChange={(v) => updateFile(i, { purpose: v })}
                  onDelete={() => setFiles(files.filter((_, idx) => idx !== i))}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2 shrink-0">
            <BrutalistButton type="button" variant="white" size="sm" onClick={onClose}>Cancel</BrutalistButton>
            <BrutalistButton type="submit" variant="primary" size="sm" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Save Changes"}
            </BrutalistButton>
          </div>
        </form>
      </div>
    </div>
  );
};

