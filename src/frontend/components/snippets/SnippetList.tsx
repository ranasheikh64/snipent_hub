"use client";

import React from "react";
import { SnippetItem } from "@/frontend/types/snippet";
import { SnippetCard } from "./SnippetCard";
import { Sparkles } from "lucide-react";

interface SnippetListProps {
  snippets: SnippetItem[];
  isLoading: boolean;
  onOpenDetails: (snippet: SnippetItem) => void;
  onResetFilters: () => void;
}

export const SnippetList: React.FC<SnippetListProps> = ({
  snippets,
  isLoading,
  onOpenDetails,
  onResetFilters,
}) => {
  return (
    <div className="flex-1">
      <div className="border-b-2 border-black pb-3 mb-6 flex items-center justify-between">
        <h2 className="font-black text-xl uppercase tracking-wider text-black">
          RESULTS <span className="text-[#7C3AED]">({snippets.length})</span>
        </h2>
      </div>

      {isLoading ? (
        <div className="p-12 text-center font-mono font-bold text-neutral-600 border-2 border-black bg-white shadow-[3px_3px_0px_#000]">
          Loading snippets from vault...
        </div>
      ) : snippets.length === 0 ? (
        <div className="p-12 text-center border-2 border-black bg-white shadow-[4px_4px_0px_#000] space-y-3">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="font-black text-lg uppercase">No snippets found</h3>
          <p className="text-xs font-mono text-neutral-600">
            Try clearing search queries or selecting another topic filter.
          </p>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-black text-white font-black text-xs uppercase border-2 border-black neo-press cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};
