"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { BrutalistButton } from "@/frontend/components/ui/BrutalistButton";
import { BrutalistInput } from "@/frontend/components/ui/BrutalistInput";
import { useAuth } from "@/frontend/hooks/useAuth";

interface NewBlogModalProps { isOpen: boolean; onClose: () => void; onCreated: () => void; }

const CATS = ["General","Flutter","Backend","Frontend","DevOps","Career","Open Source","Tutorial"];

export const NewBlogModal: React.FC<NewBlogModalProps> = ({ isOpen, onClose, onCreated }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, content, excerpt,
          category, tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) { onCreated(); onClose(); setTitle(""); setContent(""); setExcerpt(""); }
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="border-b-2 border-black p-4 bg-[#7C3AED] flex items-center justify-between shrink-0">
          <h2 className="font-black text-lg uppercase tracking-wider text-white">✍️ Write Blog Post</h2>
          <button onClick={onClose} className="p-1 border border-white bg-white/20 hover:bg-white/30 cursor-pointer text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3 flex-1">
          <BrutalistInput placeholder="BLOG TITLE" value={title} onChange={e => setTitle(e.target.value)} required />
          <div className="grid grid-cols-2 gap-2">
            <select value={category} onChange={e => setCategory(e.target.value)} className="bg-white border-2 border-black px-2 py-2 text-xs font-mono font-bold">
              {CATS.map(c => <option key={c}>{c}</option>)}
            </select>
            <BrutalistInput placeholder="tags: flutter, dart, ui" value={tags} onChange={e => setTags(e.target.value)} />
          </div>
          <textarea placeholder="Short excerpt / summary..." value={excerpt} onChange={e => setExcerpt(e.target.value)}
            rows={2} className="w-full bg-white border-2 border-black p-2.5 text-xs font-mono focus:outline-none" />
          <textarea placeholder="Write your blog content here (supports markdown)..." value={content}
            onChange={e => setContent(e.target.value)} rows={14}
            className="w-full bg-[#FDFBF7] border-2 border-black p-3 text-sm font-mono focus:outline-none resize-y" required />

          <div className="flex justify-between items-center pt-2">
            <span className="text-[11px] text-neutral-400 font-mono">Writing as: {user?.name}</span>
            <div className="flex gap-2">
              <BrutalistButton type="button" variant="white" size="sm" onClick={onClose}>Cancel</BrutalistButton>
              <BrutalistButton type="submit" variant="primary" size="sm" disabled={saving}>
                {saving ? "Publishing..." : "🚀 Publish Blog"}
              </BrutalistButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

