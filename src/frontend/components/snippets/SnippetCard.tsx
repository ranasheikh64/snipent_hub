"use client";

import React, { useState } from "react";
import { SnippetItem } from "@/frontend/types/snippet";
import { CopyButton } from "./CopyButton";
import { ArrowRight, Code2, Star } from "lucide-react";

interface SnippetCardProps {
  snippet: SnippetItem;
  onOpenDetails: (snippet: SnippetItem) => void;
}

export const SnippetCard: React.FC<SnippetCardProps> = ({ snippet, onOpenDetails }) => {
  const [stars, setStars] = useState(snippet.starsCount || 0);
  const [isStarred, setIsStarred] = useState(false);
  const primaryCode = snippet.files[0]?.code || "";

  const handleStar = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStarred(true);
    setStars((prev) => prev + 1);
    try {
      const res = await fetch(`/api/snippets/${snippet.id}/star`, { method: "POST" });
      const data = await res.json();
      if (data.success && data.starsCount) setStars(data.starsCount);
    } catch {
      // optimistic state kept
    }
  };

  return (
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]">
      <div className="bg-neutral-900 border-b-2 border-black p-4 text-white relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-neutral-300">{snippet.technology}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleStar}
            className={`flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 border border-black cursor-pointer ${
              isStarred ? "bg-amber-400 text-black" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            <Star className={`w-3 h-3 ${isStarred ? "fill-black" : ""}`} />
            <span>{stars}</span>
          </button>
          <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black">
            {snippet.level || "BEGINNER"}
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black">
              {snippet.category}
            </span>
            <span className="bg-neutral-100 text-black text-[10px] font-bold uppercase px-2 py-0.5 border border-black">
              {snippet.files.length} {snippet.files.length === 1 ? "FILE" : "FILES"}
            </span>
          </div>

          <h3
            onClick={() => onOpenDetails(snippet)}
            className="font-black text-base uppercase text-black line-clamp-2 hover:text-emerald-600 cursor-pointer mb-1 leading-snug"
          >
            {snippet.title}
          </h3>

          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
            BY {snippet.author.toUpperCase()}
          </p>

          <p className="text-xs text-neutral-700 line-clamp-2 font-mono mb-4">
            {snippet.description}
          </p>
        </div>

        <div>
          <div className="border-t-2 border-black mb-3" />
          <div className="flex items-center justify-between">
            <CopyButton textToCopy={primaryCode} snippetId={snippet.id} />
            <button
              onClick={() => onOpenDetails(snippet)}
              className="w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center neo-press hover:bg-neutral-100 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
