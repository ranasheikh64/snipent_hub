"use client";

import React, { useState, useEffect } from "react";
import { SnippetItem } from "@/frontend/types/snippet";
import { BlogPost } from "@/frontend/types/blog";
import { EditSnippetModal } from "@/frontend/components/snippets/EditSnippetModal";
import { EditBlogModal } from "@/frontend/components/blogs/EditBlogModal";
import { SnippetDetailModal } from "@/frontend/components/snippets/SnippetDetailModal";
import { BlogDetailModal } from "@/frontend/components/blogs/BlogDetailModal";
import { useAuth } from "@/frontend/hooks/useAuth";
import { Edit3, Trash2, Code2, BookOpen } from "lucide-react";

export const ProfileContent: React.FC<{ userId: string }> = ({ userId }) => {
  const { user: currentUser } = useAuth();
  const [snippets, setSnippets] = useState<SnippetItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [tab, setTab] = useState<"snippets" | "blogs">("snippets");
  const [editingSnippet, setEditingSnippet] = useState<SnippetItem | null>(null);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<SnippetItem | null>(null);
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const isOwner = currentUser?.id === userId;

  const loadData = () => {
    if (!userId) return;
    fetch(`/api/profile/${userId}`).then((r) => r.json()).then((d) => {
      if (d.success) {
        setSnippets(d.data.snippets.map((s: any) => ({ ...s, id: s._id })));
        setBlogs(d.data.blogs.map((b: any) => ({ ...b, id: b._id })));
      }
    });
  };

  useEffect(() => { loadData(); }, [userId]);

  const handleDeleteSnippet = async (id: string) => {
    if (!confirm("Delete this snippet?")) return;
    if ((await fetch(`/api/snippets/${id}`, { method: "DELETE" })).ok) {
      setSnippets(snippets.filter((s) => s.id !== id));
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    if ((await fetch(`/api/blogs/${id}`, { method: "DELETE" })).ok) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      <div className="flex gap-2 border-b-2 border-black pb-3 mb-6">
        <button onClick={() => setTab("snippets")} className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-black uppercase border-2 border-black ${tab === "snippets" ? "bg-[#7C3AED] text-white" : "bg-white"}`}>
          <Code2 className="w-4 h-4" /> Snippets ({snippets.length})
        </button>
        <button onClick={() => setTab("blogs")} className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-black uppercase border-2 border-black ${tab === "blogs" ? "bg-[#7C3AED] text-white" : "bg-white"}`}>
          <BookOpen className="w-4 h-4" /> Blogs ({blogs.length})
        </button>
      </div>

      {tab === "snippets" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {snippets.map((snip) => (
            <div key={snip.id} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] flex flex-col justify-between">
              <div onClick={() => setActiveSnippet(snip)} className="cursor-pointer group">
                <span className="text-[10px] font-black uppercase bg-[#7C3AED] text-white px-2 py-0.5 border border-black inline-block mb-1">{snip.technology}</span>
                <h3 className="font-black text-sm uppercase text-black group-hover:text-[#7C3AED] transition-colors">{snip.title}</h3>
                <p className="text-xs font-mono text-neutral-600 line-clamp-2 mt-1">{snip.description}</p>
              </div>
              {isOwner && (
                <div className="flex gap-2 justify-end mt-4 pt-2 border-t border-black/10">
                  <button onClick={() => setEditingSnippet(snip)} className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-amber-300 border border-black hover:bg-amber-400 cursor-pointer">
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => handleDeleteSnippet(snip.id)} className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-red-100 text-red-600 border border-black hover:bg-red-200 cursor-pointer">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogs.map((b) => (
            <div key={b.id} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] flex flex-col justify-between">
              <div onClick={() => setActiveBlog(b)} className="cursor-pointer group">
                <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 border border-black mb-2 inline-block">{b.category}</span>
                <h3 className="font-black text-sm uppercase text-black group-hover:text-[#7C3AED] transition-colors">{b.title}</h3>
                <p className="text-xs font-mono text-neutral-600 line-clamp-2 mt-1">{b.excerpt}</p>
              </div>
              {isOwner && (
                <div className="flex gap-2 justify-end mt-4 pt-2 border-t border-black/10">
                  <button onClick={() => setEditingBlog(b)} className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-amber-300 border border-black hover:bg-amber-400 cursor-pointer">
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => handleDeleteBlog(b.id)} className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-red-100 text-red-600 border border-black hover:bg-red-200 cursor-pointer">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <SnippetDetailModal snippet={activeSnippet} onClose={() => setActiveSnippet(null)} onForked={loadData} />
      <BlogDetailModal blog={activeBlog} onClose={() => setActiveBlog(null)} />
      <EditSnippetModal snippet={editingSnippet} isOpen={!!editingSnippet} onClose={() => setEditingSnippet(null)} onUpdated={loadData} />
      <EditBlogModal blog={editingBlog} isOpen={!!editingBlog} onClose={() => setEditingBlog(null)} onUpdated={loadData} />
    </main>
  );
};
