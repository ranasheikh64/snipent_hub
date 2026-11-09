"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MessageSquareText, CheckCircle2 } from "lucide-react";

export interface QuestionNotification {
  snippetId: string; snippetTitle: string; questionId: string;
  questionAuthor: string; questionContent: string; createdAt: string;
  isRead: boolean; answersCount: number;
}

export const QuestionNotificationBell: React.FC<{
  onSelectNotification?: (snippetId: string, questionId: string) => void;
}> = ({ onSelectNotification }) => {
  const [notifications, setNotifications] = useState<QuestionNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications/questions");
      const data = await res.json();
      if (data.success) setNotifications(data.data || []);
    } catch {}
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleClickItem = (item: QuestionNotification) => {
    setIsOpen(false);
    setNotifications(prev => prev.map(n => n.questionId === item.questionId ? { ...n, isRead: true } : n));
    fetch("/api/notifications/questions", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ snippetId: item.snippetId, questionId: item.questionId }),
    }).catch(() => {});
    if (onSelectNotification) onSelectNotification(item.snippetId, item.questionId);
    else router.push(`/?snippetId=${item.snippetId}&questionId=${item.questionId}`);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 border border-black bg-white hover:bg-[#F5F3FF] cursor-pointer flex items-center justify-center shadow-[2px_2px_0px_#000]" title="Questions">
        <MessageSquareText className="w-4 h-4 text-black" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-[#7C3AED] text-white text-[10px] font-mono font-black rounded-full min-w-5 h-5 px-1 border border-black flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border-2 border-black shadow-[4px_4px_0px_#000] z-50">
          <div className="bg-[#7C3AED] text-white px-3 py-2 border-b-2 border-black flex items-center justify-between">
            <span className="font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquareText className="w-3.5 h-3.5" /> Snippet Questions
            </span>
            <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.5 border border-white">
              {unreadCount} unread
            </span>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-black/10">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-xs font-mono text-neutral-500">
                <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                No questions yet on your snippets!
              </div>
            ) : (
              notifications.map((n) => (
                <button key={n.questionId} onClick={() => handleClickItem(n)}
                  className={`w-full text-left p-3 hover:bg-[#F5F3FF] cursor-pointer block group ${!n.isRead ? "bg-purple-50/80 border-l-4 border-l-[#7C3AED]" : "bg-white"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase text-[#7C3AED] bg-white px-1.5 py-0.5 border border-[#7C3AED]/30 truncate max-w-[200px]">{n.snippetTitle}</span>
                    <span className="text-[9px] font-mono text-neutral-400">{n.answersCount > 0 ? `${n.answersCount} ans` : "Needs answer"}</span>
                  </div>
                  <p className="text-xs font-bold text-black group-hover:text-[#7C3AED] line-clamp-2">{n.questionContent}</p>
                  <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-neutral-500">
                    <span>From: {n.questionAuthor}</span>
                    <span className="font-bold underline text-[#7C3AED]">Reply →</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
