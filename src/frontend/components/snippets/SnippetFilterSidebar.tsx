"use client";

import React from "react";
import { TopicFilter } from "@/frontend/types/snippet";
import { Star } from "lucide-react";

interface SnippetFilterSidebarProps {
  selectedTopic: TopicFilter;
  onSelectTopic: (topic: TopicFilter) => void;
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
  topicCounts: Record<string, number>;
}

export const SnippetFilterSidebar: React.FC<SnippetFilterSidebarProps> = ({
  selectedTopic,
  onSelectTopic,
  selectedLevel,
  onSelectLevel,
  topicCounts,
}) => {
  const topics: { id: TopicFilter; label: string }[] = [
    { id: "ALL", label: "ALL" },
    { id: "FLUTTER", label: "FLUTTER" },
    { id: "BACKEND", label: "BACKEND" },
    { id: "REACT", label: "REACT" },
    { id: "FULLSTACK", label: "FULL STACK" },
  ];

  const levels = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

  return (
    <aside className="w-full lg:w-64 space-y-6">
      <div>
        <div className="inline-block bg-white border-2 border-black px-4 py-1.5 font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000] mb-3">
          TOPICS
        </div>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {topics.map((t) => {
            const isSelected = selectedTopic === t.id;
            const count = topicCounts[t.id] ?? 0;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTopic(t.id)}
                className={`flex items-center justify-between px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] transition-all cursor-pointer ${
                  isSelected ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-100"
                }`}
              >
                <span>{t.label}</span>
                <span className={`text-[10px] px-1 border border-current ${isSelected ? "bg-neutral-800" : "bg-neutral-100"}`}>
                  {count}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => onSelectTopic("FAVORITES")}
            className={`flex items-center justify-between px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] transition-all cursor-pointer ${
              selectedTopic === "FAVORITES" ? "bg-[#7C3AED] text-white" : "bg-amber-100 text-black hover:bg-amber-200"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>FAVORITES</span>
            </span>
            <span className="text-[10px] px-1 border border-current bg-white text-black">
              {topicCounts["FAVORITES"] ?? 0}
            </span>
          </button>
        </div>
      </div>

      <div>
        <div className="inline-block bg-white border-2 border-black px-4 py-1.5 font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000] mb-3">
          LEVEL
        </div>
        <div className="space-y-2">
          {levels.map((lvl) => {
            const isChecked = selectedLevel.toUpperCase() === lvl;
            return (
              <button
                key={lvl}
                onClick={() => onSelectLevel(isChecked ? "" : lvl)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black uppercase tracking-wider cursor-pointer hover:bg-neutral-50"
              >
                <span>{lvl}</span>
                <div className={`w-4 h-4 border-2 border-black flex items-center justify-center ${isChecked ? "bg-black text-white" : "bg-white"}`}>
                  {isChecked && <span className="text-[10px] leading-none">✓</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
