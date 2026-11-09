"use client";

import React, { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

function HomeContent() {
  const [snippets, setSnippets] = useState<SnippetItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<TopicFilter>("ALL");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSnippet, setActiveSnippet] = useState<SnippetItem | null>(null);
  const [highlightQuestionId, setHighlightQuestionId] = useState<string | null>(null);
  const [isNewSnippetOpen, setIsNewSnippetOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const searchParams = useSearchParams();

  const fetchSnippets = useCallback(async () => {
    setIsLoading(true);
    try {
      const p = new URLSearchParams();
      if (selectedTopic !== "ALL") p.append("topic", selectedTopic);
      if (selectedLevel) p.append("level", selectedLevel);
      if (searchQuery.trim()) p.append("q", searchQuery.trim());
      const res = await fetch(`/api/snippets?${p.toString()}`);
      const json = await res.json();
      if (json.success) setSnippets(json.data);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic, selectedLevel, searchQuery]);

  useEffect(() => { fetchSnippets(); }, [fetchSnippets]);

  const openSnippet = (snippetId: string, questionId?: string) => {
    if (questionId) setHighlightQuestionId(questionId);
    const existing = snippets.find((s) => s.id === snippetId);
    if (existing) setActiveSnippet(existing);
    else fetch(`/api/snippets/${snippetId}`).then((r) => r.json()).then((d) => d.success && setActiveSnippet({ ...d.data, id: d.data._id }));
  };

  useEffect(() => {
    const sId = searchParams?.get("snippetId");
    const qId = searchParams?.get("questionId");
    if (sId) openSnippet(sId, qId || undefined);
  }, [searchParams]);

  const topicCounts = useMemo(() => {
    const c: Record<string, number> = { ALL: snippets.length };
    snippets.forEach((s) => { c[s.technology.toUpperCase()] = (c[s.technology.toUpperCase()] || 0) + 1; });
    return c;
  }, [snippets]);

  return (
    <>
      <Navbar onOpenNewSnippet={() => setIsNewSnippetOpen(true)} onOpenQuickNotes={() => setIsNotesOpen(true)} onSelectSnippetNotification={openSnippet} />
      <HeroBanner searchQuery={searchQuery} onSearchChange={setSearchQuery} onSubmitSearch={(e) => { e.preventDefault(); fetchSnippets(); }} />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 pt-10 w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <SnippetFilterSidebar selectedTopic={selectedTopic} onSelectTopic={setSelectedTopic} selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} topicCounts={topicCounts} />
          <SnippetList snippets={snippets} isLoading={isLoading} onOpenDetails={(s) => { setHighlightQuestionId(null); setActiveSnippet(s); }} onResetFilters={() => { setSelectedTopic("ALL"); setSelectedLevel(""); setSearchQuery(""); }} />
        </div>
      </main>
      <Footer />
      <SnippetDetailModal
        snippet={activeSnippet}
        onClose={() => { setActiveSnippet(null); setHighlightQuestionId(null); }}
        onForked={fetchSnippets}
        initialOpenQA={Boolean(highlightQuestionId)}
        highlightQuestionId={highlightQuestionId}
      />
      <NewSnippetModal isOpen={isNewSnippetOpen} onClose={() => setIsNewSnippetOpen(false)} onCreated={fetchSnippets} />
      <QuickNotesModal isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />
      <CommandPalette snippets={snippets} onSelectSnippet={setActiveSnippet} onOpenNewSnippet={() => setIsNewSnippetOpen(true)} />
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Suspense fallback={<div className="p-8 text-center font-mono">Loading SnippetHub...</div>}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
