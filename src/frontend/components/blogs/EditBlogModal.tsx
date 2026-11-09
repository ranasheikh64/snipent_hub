"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { BrutalistButton } from "@/frontend/components/ui/BrutalistButton";
import { BrutalistInput } from "@/frontend/components/ui/BrutalistInput";

interface EditBlogModalProps {
  blog: any | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

const CATS = ["General","Flutter","Backend","Frontend","DevOps","Career","Open Source","Tutorial"];

export const EditBlogModal: React.FC<EditBlogModalProps> = ({ blog, isOpen, onClose, onUpdated }) => {
  if (!isOpen || !blog) return null;

  const [title, setTitle] = useState(blog.title);
  const [excerpt, setExcerpt] = useState(blog.excerpt || "");
  const [content, setContent] = useState(blog.content || "");
  const [category, setCategory] = useState(blog.category || "General");
  const [tags, setTags] = useState(Array.isArray(blog.tags) ? blog.tags.join(", ") : "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/blogs/${blog._id || blog.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, content, excerpt, category,
          tags: tags.split(",").map((t: string) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) { onUpdated(); onClose(); }
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="border-b-2 border-black p-4 bg-amber-300 flex items-center justify-between shrink-0">
          <h2 className="font-black text-lg uppercase tracking-wider text-black">✏️ Edit Blog Post</h2>
          <button onClick={onClose} className="p-1 border border-black bg-white hover:bg-neutral-100 cursor-pointer">
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
          <textarea placeholder="Blog content..." value={content} onChange={e => setContent(e.target.value)}
            rows={12} className="w-full bg-[#FDFBF7] border-2 border-black p-3 text-sm font-mono focus:outline-none resize-y" required />

          <div className="flex justify-end gap-2 pt-2">
            <BrutalistButton type="button" variant="white" size="sm" onClick={onClose}>Cancel</BrutalistButton>
            <BrutalistButton type="submit" variant="primary" size="sm" disabled={saving}>
              {saving ? "Saving..." : "Update Blog"}
            </BrutalistButton>
          </div>
        </form>
      </div>
    </div>
  );
};

