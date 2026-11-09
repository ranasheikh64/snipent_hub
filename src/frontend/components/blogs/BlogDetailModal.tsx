"use client";

import React from "react";
import { BlogPost } from "@/frontend/types/blog";
import { X, Clock, User, Calendar } from "lucide-react";

interface BlogDetailModalProps {
  blog: BlogPost | null;
  onClose: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="border-b-2 border-black p-4 bg-amber-300 flex items-center justify-between">
          <div>
            <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black mb-1 inline-block">
              {blog.category}
            </span>
            <h2 className="font-black text-xl text-black uppercase leading-tight">
              {blog.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center neo-press hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-600 border-b border-neutral-300 pb-3">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {blog.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {blog.createdAt.substring(0, 10)}
            </span>
          </div>

          <p className="text-sm font-mono font-medium text-neutral-800 bg-neutral-100 p-3 border border-black">
            {blog.excerpt}
          </p>

          <div className="font-mono text-xs text-neutral-800 leading-relaxed whitespace-pre-wrap bg-neutral-50 p-4 border-2 border-black">
            {blog.content}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-neutral-200 text-black text-[11px] font-mono px-2 py-0.5 border border-black"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

