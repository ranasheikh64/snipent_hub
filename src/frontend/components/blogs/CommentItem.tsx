"use client";

import React, { useState } from "react";
import { CornerDownRight, Heart, MessageCircle, Send } from "lucide-react";
import { BlogComment } from "@/frontend/types/blog";

interface CommentItemProps {
  c: BlogComment;
  userId?: string;
  onLikeComment: (cId: string) => void;
  onReplyComment: (cId: string, text: string) => void;
  onLikeReply: (cId: string, rId: string) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  c, userId, onLikeComment, onReplyComment, onLikeReply,
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const isCommentLiked = userId ? (c.likes || []).includes(userId) : false;

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    onReplyComment(c._id, replyText);
    setReplyText("");
    setShowReplyInput(false);
  };

  return (
    <div className="bg-[#F5F3FF] border border-black p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-[#7C3AED] uppercase">{c.author}</span>
        <span className="text-[9px] font-mono text-neutral-400">{c.createdAt?.substring(0, 10)}</span>
      </div>
      <p className="text-xs font-mono text-black">{c.content}</p>

      {/* Action buttons */}
      <div className="flex items-center gap-3 pt-1 border-t border-black/10 text-[11px] font-mono">
        <button
          onClick={() => onLikeComment(c._id)}
          className={`flex items-center gap-1 cursor-pointer font-bold transition-colors ${isCommentLiked ? "text-red-600" : "text-neutral-600 hover:text-black"}`}
        >
          <Heart className={`w-3 h-3 ${isCommentLiked ? "fill-current" : ""}`} /> {(c.likes || []).length}
        </button>
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className="flex items-center gap-1 text-neutral-600 hover:text-[#7C3AED] cursor-pointer font-bold"
        >
          <MessageCircle className="w-3 h-3" /> {(c.replies || []).length} Replies
        </button>
      </div>

      {/* Replies list */}
      {(c.replies || []).length > 0 && (
        <div className="mt-2 pl-3 border-l-2 border-[#7C3AED] space-y-2">
          {c.replies.map((r) => {
            const isReplyLiked = userId ? (r.likes || []).includes(userId) : false;
            return (
              <div key={r._id} className="bg-white border border-black/30 p-2 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <CornerDownRight className="w-2.5 h-2.5 text-[#7C3AED]" />
                    <span className="text-[9px] font-black text-black uppercase">{r.author}</span>
                  </div>
                  <button
                    onClick={() => onLikeReply(c._id, r._id)}
                    className={`flex items-center gap-0.5 text-[9px] font-mono cursor-pointer ${isReplyLiked ? "text-red-600 font-bold" : "text-neutral-500 hover:text-black"}`}
                  >
                    <Heart className={`w-2.5 h-2.5 ${isReplyLiked ? "fill-current" : ""}`} /> {(r.likes || []).length}
                  </button>
                </div>
                <p className="text-[11px] font-mono text-neutral-800 pl-3">{r.content}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Reply input */}
      {showReplyInput && (
        <div className="flex gap-1.5 pt-1 pl-3">
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendReply()}
            placeholder="Reply to this comment..."
            className="flex-1 text-[11px] font-mono border border-black px-2 py-1 bg-white focus:outline-none focus:border-[#7C3AED]"
          />
          <button
            onClick={handleSendReply}
            className="px-2 py-1 bg-[#7C3AED] text-white text-[11px] font-bold border border-black hover:bg-[#6D28D9] cursor-pointer flex items-center gap-1"
          >
            <Send className="w-2.5 h-2.5" />
          </button>
        </div>
      )}
    </div>
  );
};
