"use client";

import React, { useState, useEffect } from "react";
import { CommunityItem } from "@/frontend/types/community";
import { SnippetItem } from "@/frontend/types/snippet";
import { CommunitySnippetList } from "./CommunitySnippetList";
import { useAuth } from "@/frontend/hooks/useAuth";
import { X, Users, Hash, Plus, Check, LogOut, Loader2 } from "lucide-react";

interface CommunityDetailModalProps {
  community: CommunityItem | null;
  onClose: () => void;
  onOpenNewSnippet: (defaultTag: string) => void;
  onMembershipChanged?: () => void;
}

export const CommunityDetailModal: React.FC<CommunityDetailModalProps> = ({
  community, onClose, onOpenNewSnippet, onMembershipChanged,
}) => {
  const { user } = useAuth();
  const [membersCount, setMembersCount] = useState(0);
  const [isMember, setIsMember] = useState(false);
  const [snippets, setSnippets] = useState<SnippetItem[]>([]);
  const [loadingSnippets, setLoadingSnippets] = useState(true);
  const [loadingJoin, setLoadingJoin] = useState(false);

  useEffect(() => {
    if (!community) return;
    setMembersCount(community.membersCount);
    const local = JSON.parse(localStorage.getItem("snippethub_joined") || "[]");
    setIsMember(Boolean((user?.email && community.members?.includes(user.email)) || local.includes(community.id) || local.includes(community.slug)));
    setLoadingSnippets(true);
    const q = community.hashtag || community.slug;
    fetch(`/api/snippets?q=${encodeURIComponent(q)}`)
      .then((r) => r.json()).then((j) => { if (j.success) setSnippets(j.data); })
      .finally(() => setLoadingSnippets(false));
  }, [community, user]);

  if (!community) return null;

  const handleToggleJoin = async () => {
    setLoadingJoin(true);
    try {
      const res = await fetch(`/api/communities/${community.id}/join`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user?.email }),
      });
      const data = await res.json();
      if (data.success) {
        setIsMember(data.isMember);
        setMembersCount(data.membersCount);
        const local = JSON.parse(localStorage.getItem("snippethub_joined") || "[]");
        const updated = data.isMember
          ? Array.from(new Set([...local, community.id, community.slug]))
          : local.filter((x: string) => x !== community.id && x !== community.slug);
        localStorage.setItem("snippethub_joined", JSON.stringify(updated));
        onMembershipChanged?.();
      }
    } finally { setLoadingJoin(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="border-b-2 border-black p-4 bg-[#F5F3FF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-white border-2 border-black shadow-[2px_2px_0px_#000]">{community.icon}</span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-mono font-bold bg-[#7C3AED] text-white px-2 py-0.5 border border-black flex items-center gap-1">
                  <Hash className="w-3 h-3" /> {community.hashtag?.replace("#", "") || community.slug}
                </span>
                <span className="text-[10px] font-mono text-neutral-600 uppercase">By {community.creatorName}</span>
              </div>
              <h2 className="font-black text-xl text-black uppercase leading-tight">{community.name}</h2>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center neo-press hover:bg-neutral-100 cursor-pointer">
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs font-mono text-neutral-800 bg-neutral-100 p-3 border border-black">{community.description}</p>
          <div className="flex items-center justify-between p-3 border-2 border-black bg-neutral-50 shadow-[2px_2px_0px_#000]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold">
              <Users className="w-4 h-4 text-[#7C3AED]" />
              <span>{membersCount} Developers in this Space</span>
            </div>
            <button
              onClick={handleToggleJoin} disabled={loadingJoin}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-black neo-press cursor-pointer transition-colors ${
                isMember ? "bg-red-500 text-white hover:bg-red-600" : "bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
              }`}
            >
              {loadingJoin ? (<><Loader2 className="w-3.5 h-3.5 animate-spin" /> {isMember ? "Leaving..." : "Joining..."}</>) :
               isMember ? (<><LogOut className="w-3.5 h-3.5" /> Leave Space</>) : (<><Check className="w-3.5 h-3.5" /> Join Space</>)}
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <h4 className="font-black text-sm uppercase">Community Snippets ({snippets.length})</h4>
            <button
              onClick={() => { onClose(); onOpenNewSnippet(community.hashtag || community.slug); }}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-400 text-black text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] neo-press cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Post with {community.hashtag}
            </button>
          </div>

          <CommunitySnippetList snippets={snippets} loading={loadingSnippets} />
        </div>
      </div>
    </div>
  );
};
