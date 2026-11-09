"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

export const ProfileHeader: React.FC<{ profileUser: any }> = ({ profileUser }) => (
  <div className="w-full bg-[#F5F3FF] border-b-2 border-black py-8 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-black hover:text-[#7C3AED] border border-black bg-white px-2.5 py-1 shadow-[2px_2px_0px_#000] mb-4">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore
      </Link>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border-3 border-black p-5 shadow-[6px_6px_0px_#000]">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 border-2 border-black relative overflow-hidden flex items-center justify-center shrink-0">
          {profileUser?.avatar ? (
            <Image src={profileUser.avatar} alt="avatar" fill className="object-cover" />
          ) : (
            <User className="w-8 h-8 text-neutral-400" />
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-black uppercase text-black">{profileUser?.name || "Developer"}</h1>
          <p className="text-xs font-mono text-neutral-600">{profileUser?.email}</p>
          {profileUser?.bio && <p className="text-xs font-mono mt-1 text-neutral-700 bg-neutral-50 p-2 border border-black/20">{profileUser.bio}</p>}
        </div>
      </div>
    </div>
  </div>
);

