"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BrutalistButton } from "@/frontend/components/ui/BrutalistButton";
import { useAuth } from "@/frontend/hooks/useAuth";
import { AuthModal } from "@/frontend/components/auth/AuthModal";
import { QuestionNotificationBell } from "./QuestionNotificationBell";
import { Plus, Terminal, BookOpen, Users, LogOut, User } from "lucide-react";

interface NavbarProps {
  onOpenNewSnippet: () => void;
  onOpenQuickNotes: () => void;
  onSelectSnippetNotification?: (snippetId: string, questionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNewSnippet,
  onOpenQuickNotes,
  onSelectSnippetNotification,
}) => {
  const { user, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b-2 border-black sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 relative rounded-xl overflow-hidden border-2 border-black shadow-[2px_2px_0px_#7C3AED]">
            <Image src="/only_logo.png" alt="SnippetHub" fill className="object-cover" />
          </div>
          <span className="font-black text-2xl tracking-tight text-black">
            Snippet<span className="text-[#7C3AED]">Hub</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          <Link href="/" className="text-xs font-black uppercase tracking-wider text-black hover:text-[#7C3AED]">
            Snippets
          </Link>
          <Link href="/blogs" className="text-xs font-black uppercase tracking-wider text-black hover:text-[#7C3AED] flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Blogs
          </Link>
          <Link href="/communities" className="text-xs font-black uppercase tracking-wider text-black hover:text-[#7C3AED] flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> Communities
          </Link>
          <button onClick={onOpenQuickNotes} className="text-xs font-black uppercase tracking-wider text-black hover:text-[#7C3AED] flex items-center gap-1 cursor-pointer">
            <Terminal className="w-3.5 h-3.5" /> Notes
          </button>
        </nav>

        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="flex items-center gap-2">
              <QuestionNotificationBell onSelectNotification={onSelectSnippetNotification} />
              <Link
                href={`/profile/${user.id}`}
                className="text-xs font-mono font-bold uppercase bg-neutral-100 hover:bg-[#F5F3FF] px-2.5 py-1 border border-black flex items-center gap-1 cursor-pointer transition-colors"
                title="View My Profile"
              >
                <User className="w-3 h-3 text-[#7C3AED]" /> {user.name}
              </Link>
              <button onClick={() => logout()} title="Logout" className="p-1.5 border border-black hover:bg-neutral-100 cursor-pointer">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsAuthOpen(true)} className="text-xs font-mono font-bold uppercase hover:underline cursor-pointer px-2">
              Log In
            </button>
          )}

          <BrutalistButton variant="primary" size="sm" onClick={onOpenNewSnippet} className="flex items-center gap-1 bg-[#7C3AED] text-white hover:bg-[#6D28D9]">
            <Plus className="w-3.5 h-3.5" /> <span>Post Code</span>
          </BrutalistButton>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
};
