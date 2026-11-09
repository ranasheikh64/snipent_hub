"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/frontend/components/layout/Navbar";
import { Footer } from "@/frontend/components/layout/Footer";
import { CommunityCard } from "@/frontend/components/community/CommunityCard";
import { CreateCommunityModal } from "@/frontend/components/community/CreateCommunityModal";
import { CommunityDetailModal } from "@/frontend/components/community/CommunityDetailModal";
import { NewSnippetModal } from "@/frontend/components/snippets/NewSnippetModal";
import { CommunityItem } from "@/frontend/types/community";
import { ArrowLeft, Plus } from "lucide-react";
import { BrutalistButton } from "@/frontend/components/ui/BrutalistButton";

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<CommunityItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityItem | null>(null);
  const [isNewSnippetOpen, setIsNewSnippetOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);

  const fetchCommunities = () => {
    fetch("/api/communities")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setCommunities(json.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Navbar onOpenNewSnippet={() => { setActiveTag(undefined); setIsNewSnippetOpen(true); }} onOpenQuickNotes={() => {}} />

      <div className="w-full bg-[#F5F3FF] border-b-2 border-black py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="mb-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-black hover:text-[#7C3AED] border border-black bg-white px-2.5 py-1 shadow-[2px_2px_0px_#000] neo-press cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" /> Back to Snippets
              </Link>
            </div>
            <div className="inline-block bg-[#7C3AED] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 mb-2 border-2 border-black">
              DEVELOPER HUBS & SPACES
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase">
              DEV <span className="bg-white px-2 py-0.5 border-3 border-black shadow-[4px_4px_0px_#7C3AED]">COMMUNITIES</span>
            </h1>
          </div>

          <BrutalistButton variant="primary" size="md" onClick={() => setIsModalOpen(true)} className="bg-[#7C3AED] text-white hover:bg-[#6D28D9]">
            <Plus className="w-4 h-4 mr-1.5" /> Create Space
          </BrutalistButton>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((comm) => (
            <CommunityCard key={comm.id} community={comm} onSelect={setSelectedCommunity} />
          ))}
        </div>
      </main>

      <Footer />
      <CreateCommunityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreated={fetchCommunities} />
      <CommunityDetailModal
        community={selectedCommunity}
        onClose={() => setSelectedCommunity(null)}
        onOpenNewSnippet={(tag) => { setActiveTag(tag); setIsNewSnippetOpen(true); }}
        onMembershipChanged={fetchCommunities}
      />
      <NewSnippetModal
        isOpen={isNewSnippetOpen}
        onClose={() => { setIsNewSnippetOpen(false); setActiveTag(undefined); }}
        onCreated={fetchCommunities}
        defaultTag={activeTag}
      />
    </div>
  );
}
