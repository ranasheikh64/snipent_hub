"use client";

import React, { useState, useEffect } from "react";
import { SnippetItem } from "@/frontend/types/snippet";
import { Search, Code2, ArrowRight } from "lucide-react";

interface CommandPaletteProps {
  snippets: SnippetItem[];
  onSelectSnippet: (snippet: SnippetItem) => void;
  onOpenNewSnippet: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  snippets,
  onSelectSnippet,
  onOpenNewSnippet,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const filtered = snippets.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.technology.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-20 p-4">
      <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] w-full max-w-xl flex flex-col overflow-hidden">
        {/* Input Bar */}
        <div className="border-b-2 border-black p-3 bg-neutral-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-600 stroke-[2.5]" />
          <input
            autoFocus
            type="text"
            placeholder="Type to search snippets or press ESC..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent font-mono text-sm focus:outline-none"
          />
          <kbd className="text-[10px] font-mono bg-white border border-black px-1.5 py-0.5">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenNewSnippet();
            }}
            className="w-full text-left p-2 border border-black bg-emerald-100 hover:bg-emerald-200 font-mono text-xs font-bold flex items-center justify-between cursor-pointer"
          >
            <span>+ Create New Code Snippet</span>
            <span className="text-[10px] uppercase bg-black text-white px-1">Action</span>
          </button>

          {filtered.length === 0 ? (
            <div className="p-4 text-center font-mono text-xs text-neutral-500">
              No matching snippets found
            </div>
          ) : (
            filtered.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setIsOpen(false);
                  onSelectSnippet(s);
                }}
                className="w-full text-left p-2.5 hover:bg-neutral-100 border border-transparent hover:border-black font-mono text-xs flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-black">{s.title}</span>
                  <span className="text-[10px] bg-neutral-200 px-1 border border-neutral-400">
                    {s.technology}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

