"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Navbar } from "@/frontend/components/layout/Navbar";
import { HeroBanner } from "@/frontend/components/layout/HeroBanner";
import { Footer } from "@/frontend/components/layout/Footer";
import { CommandPalette } from "@/frontend/components/layout/CommandPalette";
import { SnippetFilterSidebar } from "@/frontend/components/snippets/SnippetFilterSidebar";
import { SnippetList } from "@/frontend/components/snippets/SnippetList";
import { SnippetDetailModal } from "@/frontend/components/snippets/SnippetDetailModal";
import { NewSnippetModal } from "@/frontend/components/snippets/NewSnippetModal";
import { QuickNotesModal } from "@/frontend/components/notes/QuickNotesModal";
import { SnippetItem, TopicFilter } from "@/frontend/types/snippet";

export default function Home() {
  const [snippets, setSnippets] = useState<SnippetItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<TopicFilter>("ALL");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSnippet, setActiveSnippet] = useState<SnippetItem | null>(null);
  const [isNewSnippetOpen, setIsNewSnippetOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const fetchSnippets = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedTopic !== "ALL") params.append("topic", selectedTopic);
      if (selectedLevel) params.append("level", selectedLevel);
      if (searchQuery.trim()) params.append("q", searchQuery.trim());

      const res = await fetch(`/api/snippets?${params.toString()}`);
      const json = await res.json();
      if (json.success) setSnippets(json.data);
    } catch (err) {
      console.error("Failed to load snippets", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic, selectedLevel, searchQuery]);

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: snippets.length };
    snippets.forEach((s) => {
      const tech = s.technology.toUpperCase();
      counts[tech] = (counts[tech] || 0) + 1;
    });
    return counts;
  }, [snippets]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Navbar onOpenNewSnippet={() => setIsNewSnippetOpen(true)} onOpenQuickNotes={() => setIsNotesOpen(true)} />
      <HeroBanner
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSubmitSearch={(e) => { e.preventDefault(); fetchSnippets(); }}
      />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 pt-10 w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <SnippetFilterSidebar
            selectedTopic={selectedTopic}
            onSelectTopic={setSelectedTopic}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            topicCounts={topicCounts}
          />
          <SnippetList
            snippets={snippets}
            isLoading={isLoading}
            onOpenDetails={setActiveSnippet}
            onResetFilters={() => { setSelectedTopic("ALL"); setSelectedLevel(""); setSearchQuery(""); }}
          />
        </div>
      </main>
      <Footer />
      <SnippetDetailModal snippet={activeSnippet} onClose={() => setActiveSnippet(null)} onForked={fetchSnippets} />
      <NewSnippetModal isOpen={isNewSnippetOpen} onClose={() => setIsNewSnippetOpen(false)} onCreated={fetchSnippets} />
      <QuickNotesModal isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />
      <CommandPalette snippets={snippets} onSelectSnippet={setActiveSnippet} onOpenNewSnippet={() => setIsNewSnippetOpen(true)} />
    </div>
  );
}
