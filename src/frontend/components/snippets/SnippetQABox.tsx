"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/frontend/hooks/useAuth";
import { MessageCircle, ChevronDown, ChevronUp, Send, HelpCircle } from "lucide-react";

interface Answer { author: string; content: string; createdAt: string; }
interface Question { _id: string; author: string; content: string; createdAt: string; answers: Answer[]; }

export const SnippetQABox: React.FC<{ snippetId: string }> = ({ snippetId }) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQ, setNewQ] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) fetch(`/api/snippets/${snippetId}/questions`)
      .then(r => r.json()).then(d => d.success && setQuestions(d.data));
  }, [snippetId, isOpen]);

  const submitQ = async () => {
    if (!newQ.trim() || !user) return;
    const res = await fetch(`/api/snippets/${snippetId}/questions`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newQ }),
    });
    const data = await res.json();
    if (data.success) { setQuestions(q => [...q, data.data]); setNewQ(""); }
  };

  const submitA = async (qId: string) => {
    const content = answers[qId];
    if (!content?.trim() || !user) return;
    const res = await fetch(`/api/snippets/${snippetId}/questions/${qId}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    if (data.success) {
      setQuestions(qs => qs.map(q => q._id === qId ? { ...q, answers: [...q.answers, data.data] } : q));
      setAnswers(a => ({ ...a, [qId]: "" }));
    }
  };

  return (
    <div className="border-2 border-black bg-white shadow-[3px_3px_0px_#000]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#F5F3FF] hover:bg-[#EDE9FE] cursor-pointer border-b-2 border-black"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#7C3AED]" />
          <span className="font-black text-sm uppercase tracking-wide">Q&amp;A — {questions.length} Questions</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
          {questions.length === 0 && <p className="text-xs font-mono text-neutral-500 text-center py-4">No questions yet. Be the first!</p>}
          {questions.map(q => (
            <div key={q._id} className="border border-black p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black text-[#7C3AED] uppercase">{q.author}</span>
                  <p className="text-xs font-mono mt-0.5">{q.content}</p>
                </div>
                <button onClick={() => setExpanded(expanded === q._id ? null : q._id)} className="text-[10px] font-bold text-neutral-500 hover:text-black flex items-center gap-1 shrink-0 cursor-pointer">
                  <MessageCircle className="w-3 h-3" /> {q.answers.length}
                </button>
              </div>
              {expanded === q._id && (
                <div className="pl-3 border-l-2 border-[#7C3AED] space-y-2">
                  {q.answers.map((a, i) => (
                    <div key={i} className="bg-[#F5F3FF] p-2">
                      <span className="text-[10px] font-black">{a.author}</span>
                      <p className="text-xs font-mono">{a.content}</p>
                    </div>
                  ))}
                  {user && (
                    <div className="flex gap-1 mt-1">
                      <input value={answers[q._id] || ""} onChange={e => setAnswers(a => ({ ...a, [q._id]: e.target.value }))}
                        placeholder="Your answer..." className="flex-1 text-xs font-mono border border-black px-2 py-1 focus:outline-none" />
                      <button onClick={() => submitA(q._id)} className="p-1.5 bg-[#7C3AED] text-white border border-black cursor-pointer hover:bg-[#6D28D9]">
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {user ? (
            <div className="flex gap-2 pt-2 border-t border-black/20">
              <input value={newQ} onChange={e => setNewQ(e.target.value)} onKeyDown={e => e.key === "Enter" && submitQ()}
                placeholder="Ask a question about this snippet..." className="flex-1 text-xs font-mono border-2 border-black px-3 py-2 focus:outline-none focus:border-[#7C3AED]" />
              <button onClick={submitQ} className="px-3 py-2 bg-[#7C3AED] text-white text-xs font-bold border-2 border-black cursor-pointer hover:bg-[#6D28D9] flex items-center gap-1">
                <Send className="w-3 h-3" /> Ask
              </button>
            </div>
          ) : (
            <p className="text-[11px] font-mono text-center text-neutral-500 border-t border-black/20 pt-3">Login to ask a question</p>
          )}
        </div>
      )}
    </div>
  );
};

