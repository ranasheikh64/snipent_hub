"use client";

import React, { useState } from "react";
import { BrutalistButton } from "@/frontend/components/ui/BrutalistButton";
import { BrutalistInput } from "@/frontend/components/ui/BrutalistInput";
import { SnippetFileRow } from "./SnippetFileRow";
import { useAuth } from "@/frontend/hooks/useAuth";
import { X, Plus } from "lucide-react";

interface NewSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  defaultTag?: string;
}

export const NewSnippetModal: React.FC<NewSnippetModalProps> = ({
  isOpen, onClose, onCreated, defaultTag,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technology, setTechnology] = useState("Flutter");
  const [category, setCategory] = useState("UI Components");
  const [visibility, setVisibility] = useState<"public" | "private" | "draft">("public");
  const [files, setFiles] = useState([{ filename: "main.dart", language: "dart", code: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !files[0]?.code.trim()) return;
    setIsSubmitting(true);
    try {
      const extraTags = defaultTag ? [defaultTag] : [];
      const res = await fetch("/api/snippets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, description, technology, category, isPublic: visibility === "public",
          tags: [technology, category, visibility, ...extraTags], files, author: user?.name || "Rana Sheikh",
        }),
      });
      if (res.ok) { onCreated(); onClose(); }
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="border-b-2 border-black p-4 bg-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-black text-lg uppercase tracking-wider text-black">+ Post Code Snippet</h2>
            {defaultTag && (
              <span className="text-[10px] font-mono font-bold bg-[#7C3AED] text-white px-2 py-0.5 border border-black">{defaultTag}</span>
            )}
          </div>
          <button onClick={onClose} className="p-1 border border-black bg-white hover:bg-neutral-100 cursor-pointer">
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3">
          <BrutalistInput placeholder="SNIPPET TITLE" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <div className="grid grid-cols-3 gap-2">
            <select value={technology} onChange={(e) => setTechnology(e.target.value)} className="bg-white border-2 border-black px-2 py-2 text-xs font-mono font-bold">
              <option value="Flutter">Flutter</option><option value="React">React</option><option value="Next.js">Next.js</option>
              <option value="Node.js">Node.js</option><option value="Python">Python</option><option value="Go">Go</option>
              <option value="Rust">Rust</option><option value="Swift">Swift</option><option value="Kotlin">Kotlin</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-white border-2 border-black px-2 py-2 text-xs font-mono font-bold">
              <option value="UI Components">UI Components</option><option value="Authentication">Authentication</option>
              <option value="Payment Gateway">Payment Gateway</option><option value="Backend API">Backend API</option>
            </select>
            <select value={visibility} onChange={(e) => setVisibility(e.target.value as any)} className="bg-white border-2 border-black px-2 py-2 text-xs font-mono font-bold">
              <option value="public">🌐 Public (All)</option><option value="private">🔒 Private (Me)</option><option value="draft">📝 Draft</option>
            </select>
          </div>
          <textarea placeholder="SHORT DESCRIPTION..." value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full bg-white border-2 border-black p-2.5 text-xs font-mono focus:outline-none" />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider">Code Files</span>
              <button type="button" onClick={() => setFiles([...files, { filename: "component.dart", language: "dart", code: "" }])} className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline">
                <Plus className="w-3.5 h-3.5" /> Add File
              </button>
            </div>
            {files.map((file, i) => (
              <SnippetFileRow
                key={i} filename={file.filename} code={file.code} canDelete={files.length > 1}
                onFilenameChange={(v) => { const u = [...files]; u[i].filename = v; setFiles(u); }}
                onCodeChange={(v) => { const u = [...files]; u[i].code = v; setFiles(u); }}
                onDelete={() => setFiles(files.filter((_, idx) => idx !== i))}
              />
            ))}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <BrutalistButton type="button" variant="white" size="sm" onClick={onClose}>Cancel</BrutalistButton>
            <BrutalistButton type="submit" variant="primary" size="sm" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : visibility === "draft" ? "Save as Draft" : "Save to Vault"}
            </BrutalistButton>
          </div>
        </form>
      </div>
    </div>
  );
};
