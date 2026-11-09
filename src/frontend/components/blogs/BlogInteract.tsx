"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/frontend/hooks/useAuth";
import { Send, Heart, MessageCircle } from "lucide-react";

interface Comment { author: string; content: string; createdAt: string; }
interface BlogInteractProps {
  blogId: string;
  initialLikes?: number;
  isLiked?: boolean;
}

export const BlogInteract: React.FC<BlogInteractProps> = ({ blogId, initialLikes = 0, isLiked = false }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [liked, setLiked] = useState(isLiked);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/blogs/${blogId}/comments`).then(r => r.json())
        .then(d => d.success && setComments(d.data));
    }
  }, [blogId, showComments]);

  const handleLike = async () => {
    if (!user) return;
    const res = await fetch(`/api/blogs/${blogId}/like`, { method: "POST" });
    const data = await res.json();
    if (data.success) { setLiked(data.liked); setLikesCount(data.likesCount); }
  };

  const submitComment = async () => {
    if (!newComment.trim() || !user) return;
    setLoading(true);
    const res = await fetch(`/api/blogs/${blogId}/comments`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment }),
    });
    const data = await res.json();
    if (data.success) { setComments(c => [...c, data.data]); setNewComment(""); }
    setLoading(false);
  };

  return (
    <div className="border-t-2 border-black pt-4 space-y-3">
      <div className="flex items-center gap-4">
        <button onClick={handleLike} className={`flex items-center gap-1.5 text-xs font-bold border border-black px-3 py-1.5 cursor-pointer transition-colors ${liked ? "bg-red-500 text-white" : "bg-white hover:bg-red-50"}`}>
          <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} /> {likesCount} Likes
        </button>
        <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1.5 text-xs font-bold border border-black px-3 py-1.5 bg-white hover:bg-[#F5F3FF] cursor-pointer">
          <MessageCircle className="w-3.5 h-3.5 text-[#7C3AED]" /> {comments.length} Comments
        </button>
      </div>

      {showComments && (
        <div className="space-y-3">
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {comments.length === 0 && <p className="text-xs font-mono text-neutral-400 text-center py-3">No comments yet.</p>}
            {comments.map((c, i) => (
              <div key={i} className="bg-[#F5F3FF] border border-black p-3">
                <span className="text-[10px] font-black text-[#7C3AED] uppercase">{c.author}</span>
                <p className="text-xs font-mono mt-1">{c.content}</p>
              </div>
            ))}
          </div>
          {user ? (
            <div className="flex gap-2">
              <input value={newComment} onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submitComment()}
                placeholder="Write a comment..." className="flex-1 text-xs font-mono border-2 border-black px-3 py-2 focus:outline-none focus:border-[#7C3AED]" />
              <button onClick={submitComment} disabled={loading} className="px-3 py-2 bg-[#7C3AED] text-white text-xs font-bold border-2 border-black cursor-pointer hover:bg-[#6D28D9] flex items-center gap-1 disabled:opacity-60">
                <Send className="w-3 h-3" /> Post
              </button>
            </div>
          ) : (
            <p className="text-[11px] font-mono text-center text-neutral-500">Login to comment</p>
          )}
        </div>
      )}
    </div>
  );
};

