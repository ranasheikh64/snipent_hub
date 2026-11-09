"use client";

import React, { useState } from "react";
import { SnippetItem } from "@/frontend/types/snippet";
import { CopyButton } from "@/frontend/components/snippets/CopyButton";
import { CodeTabsViewer } from "@/frontend/components/snippets/CodeTabsViewer";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CommunitySnippetListProps {
  snippets: SnippetItem[];
  loading: boolean;
}

export const CommunitySnippetList: React.FC<CommunitySnippetListProps> = ({ snippets, loading }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (loading) {
    return <div className="p-4 text-center font-mono text-xs text-neutral-500">Loading community snippets...</div>;
  }

  if (snippets.length === 0) {
    return (
      <div className="p-6 text-center font-mono text-xs border border-dashed border-black bg-neutral-50">
        No snippets posted to this space yet. Be the first to share code!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {snippets.map((snip) => {
        const isExpanded = expandedId === snip.id;
        return (
          <div key={snip.id} className="border-2 border-black bg-white shadow-[3px_3px_0px_#000] p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold bg-neutral-200 px-1.5 py-0.5 border border-black uppercase mr-2">
                  {snip.technology}
                </span>
                <span className="font-mono font-bold text-xs text-black">{snip.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton textToCopy={snip.files[0]?.code || ""} snippetId={snip.id} label="Copy" />
                <button
                  onClick={() => setExpandedId(isExpanded ? null : snip.id)}
                  className="p-1 border border-black bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
                  title="Toggle Code"
                >
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <p className="text-[11px] font-mono text-neutral-600 line-clamp-1">{snip.description}</p>

            {isExpanded && (
              <div className="pt-2">
                <CodeTabsViewer files={snip.files} snippetId={snip.id} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

