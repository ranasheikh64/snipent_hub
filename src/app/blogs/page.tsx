"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/frontend/components/layout/Navbar";
import { Footer } from "@/frontend/components/layout/Footer";
import { BlogCard } from "@/frontend/components/blogs/BlogCard";
import { BlogDetailModal } from "@/frontend/components/blogs/BlogDetailModal";
import { NewBlogModal } from "@/frontend/components/blogs/NewBlogModal";
import { BlogPost } from "@/frontend/types/blog";
import { ArrowLeft, Plus } from "lucide-react";
import { useAuth } from "@/frontend/hooks/useAuth";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [isNewBlogOpen, setIsNewBlogOpen] = useState(false);
  const { user } = useAuth();

  const loadBlogs = () => {
    fetch("/api/blogs").then(r => r.json()).then(j => j.success && setBlogs(j.data));
  };

  useEffect(() => { loadBlogs(); }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Navbar onOpenNewSnippet={() => {}} onOpenQuickNotes={() => {}} />

      <div className="w-full bg-[#F5F3FF] border-b-2 border-black py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="mb-3">
              <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-black hover:text-[#7C3AED] border border-black bg-white px-2.5 py-1 shadow-[2px_2px_0px_#000] neo-press cursor-pointer">
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" /> Back to Snippets
              </Link>
            </div>
            <div className="inline-block bg-[#7C3AED] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 mb-2 border-2 border-black">
              DEVELOPER GUIDES &amp; DOCUMENTATION
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase">
              TECHNICAL <span className="bg-white px-2 py-0.5 border-3 border-black shadow-[4px_4px_0px_#7C3AED]">BLOGS</span>
            </h1>
          </div>
          {user && (
            <button onClick={() => setIsNewBlogOpen(true)} className="flex items-center gap-2 bg-[#7C3AED] text-white font-black text-xs uppercase px-4 py-3 border-2 border-black shadow-[4px_4px_0px_#000] neo-press cursor-pointer hover:bg-[#6D28D9] shrink-0">
              <Plus className="w-4 h-4 stroke-[3]" /> Write Blog
            </button>
          )}
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onOpenBlog={setActiveBlog} />
          ))}
        </div>
      </main>

      <Footer />
      <BlogDetailModal blog={activeBlog} onClose={() => setActiveBlog(null)} />
      <NewBlogModal isOpen={isNewBlogOpen} onClose={() => setIsNewBlogOpen(false)} onCreated={loadBlogs} />
    </div>
  );
}
