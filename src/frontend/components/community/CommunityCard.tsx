"use client";

import React from "react";
import { CommunityItem } from "@/backend/data/initialCommunities";
import { Users, Code, ArrowRight, Hash } from "lucide-react";

interface CommunityCardProps {
  community: CommunityItem;
  onSelect: (comm: CommunityItem) => void;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ community, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(community)}
      className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between p-5 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl p-2 bg-neutral-100 border-2 border-black shadow-[2px_2px_0px_#000]">
            {community.icon}
          </span>
          <span className="text-[10px] font-mono font-bold uppercase bg-black text-white px-2 py-0.5 border border-black">
            Created by {community.creatorName}
          </span>
        </div>

        <h3 className="font-black text-lg uppercase text-black mb-1 hover:text-[#7C3AED] transition-colors">
          {community.name}
        </h3>

        <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#7C3AED] bg-purple-50 px-2 py-0.5 border border-[#7C3AED] mb-2.5">
          <Hash className="w-3 h-3" />
          <span>{community.hashtag?.replace("#", "") || community.slug}</span>
        </div>

        <p className="text-xs font-mono text-neutral-600 line-clamp-2 mb-4">
          {community.description}
        </p>
      </div>

      <div>
        <div className="border-t-2 border-black mb-3" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-600">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {community.membersCount}
            </span>
            <span className="flex items-center gap-1">
              <Code className="w-3.5 h-3.5" /> {community.snippetsCount || 0}
            </span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-black hover:text-[#7C3AED] cursor-pointer"
          >
            <span>Enter Space</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
