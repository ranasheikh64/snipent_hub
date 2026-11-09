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
import { getTopicCounts, filterSnippets } from "@/frontend/components/snippets/snippetFiltersHelper";

function HomeContent() {
  const [allSnippets, setAllSnippets] = useState<SnippetItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<TopicFilter>("ALL");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSnippet, setActiveSnippet] = useState<SnippetItem | null>(null);
  const [highlightQuestionId, setHighlightQuestionId] = useState<string | null>(null);
  const [isNewSnippetOpen, setIsNewSnippetOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const searchParams = useSearchParams();

  const fetchAllSnippets = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/snippets?topic=ALL");
      const json = await res.json();
      if (json.success) setAllSnippets(json.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchAllSnippets(); }, [fetchAllSnippets]);

  const openSnippet = (id: string, qId?: string) => {
    if (qId) setHighlightQuestionId(qId);
    const existing = allSnippets.find((s) => s.id === id);
    if (existing) setActiveSnippet(existing);
    else fetch(`/api/snippets/${id}`).then((r) => r.json()).then((d) => d.success && setActiveSnippet({ ...d.data, id: d.data._id }));
  };

  useEffect(() => {
    const sId = searchParams?.get("snippetId");
    const qId = searchParams?.get("questionId");
    if (sId) openSnippet(sId, qId || undefined);
  }, [searchParams]);

  const topicCounts = useMemo(() => getTopicCounts(allSnippets), [allSnippets]);
  const filtered = useMemo(() => filterSnippets(allSnippets, selectedTopic, selectedLevel, searchQuery), [allSnippets, selectedTopic, selectedLevel, searchQuery]);

  return (
    <>
      <Navbar onOpenNewSnippet={() => setIsNewSnippetOpen(true)} onOpenQuickNotes={() => setIsNotesOpen(true)} onSelectSnippetNotification={openSnippet} />
      <HeroBanner searchQuery={searchQuery} onSearchChange={setSearchQuery} onSubmitSearch={(e) => { e.preventDefault(); }} />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 pt-10 w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <SnippetFilterSidebar selectedTopic={selectedTopic} onSelectTopic={setSelectedTopic} selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} topicCounts={topicCounts} />
          <SnippetList snippets={filtered} isLoading={isLoading} onOpenDetails={(s) => { setHighlightQuestionId(null); setActiveSnippet(s); }} onResetFilters={() => { setSelectedTopic("ALL"); setSelectedLevel(""); setSearchQuery(""); }} />
        </div>
      </main>
      <Footer />
      <SnippetDetailModal snippet={activeSnippet} onClose={() => { setActiveSnippet(null); setHighlightQuestionId(null); }} onForked={fetchAllSnippets} initialOpenQA={Boolean(highlightQuestionId)} highlightQuestionId={highlightQuestionId} />
      <NewSnippetModal isOpen={isNewSnippetOpen} onClose={() => setIsNewSnippetOpen(false)} onCreated={fetchAllSnippets} />
      <QuickNotesModal isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />
      <CommandPalette snippets={allSnippets} onSelectSnippet={setActiveSnippet} onOpenNewSnippet={() => setIsNewSnippetOpen(true)} />
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
