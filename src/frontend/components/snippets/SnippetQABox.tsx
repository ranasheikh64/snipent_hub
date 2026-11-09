"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/frontend/hooks/useAuth";
import { QuestionItem } from "./QuestionItem";
import { ChevronDown, ChevronUp, Send, HelpCircle } from "lucide-react";

export const SnippetQABox: React.FC<{
  snippetId: string;
  initialOpen?: boolean;
  highlightQuestionId?: string | null;
}> = ({ snippetId, initialOpen = false, highlightQuestionId }) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [newQ, setNewQ] = useState("");
  const [expanded, setExpanded] = useState<string | null>(highlightQuestionId || null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(initialOpen || Boolean(highlightQuestionId));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialOpen || highlightQuestionId) setIsOpen(true);
    if (highlightQuestionId) setExpanded(highlightQuestionId);
  }, [initialOpen, highlightQuestionId]);

  useEffect(() => {
    if (isOpen) {
      fetch(`/api/snippets/${snippetId}/questions`).then(r => r.json()).then(d => {
        if (d.success) setQuestions(d.data);
        if (highlightQuestionId) {
          setExpanded(highlightQuestionId);
          setTimeout(() => containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
        }
      });
    }
  }, [snippetId, isOpen, highlightQuestionId]);

  const submitQ = async () => {
    if (!newQ.trim() || !user) return;
    const res = await fetch(`/api/snippets/${snippetId}/questions`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: newQ }),
    });
    const data = await res.json();
    if (data.success) { setQuestions(q => [...q, data.data]); setNewQ(""); }
  };

  const submitA = async (qId: string) => {
    const content = answers[qId];
    if (!content?.trim() || !user) return;
    const res = await fetch(`/api/snippets/${snippetId}/questions/${qId}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }),
    });
    const data = await res.json();
    if (data.success) {
      setQuestions(qs => qs.map(q => q._id === qId ? { ...q, answers: [...q.answers, data.data] } : q));
      setAnswers(a => ({ ...a, [qId]: "" }));
      await fetch("/api/notifications/questions", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snippetId, questionId: qId }),
      }).catch(() => {});
      window.dispatchEvent(new Event("notifications_updated"));
    }
  };

  return (
    <div ref={containerRef} className="border-2 border-black bg-white shadow-[3px_3px_0px_#000]">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-4 py-3 bg-[#F5F3FF] hover:bg-[#EDE9FE] cursor-pointer border-b-2 border-black">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#7C3AED]" />
          <span className="font-black text-sm uppercase tracking-wide">Q&amp;A — {questions.length} Questions</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 max-h-[420px] overflow-y-auto">
          {questions.length === 0 && <p className="text-xs font-mono text-neutral-500 text-center py-4">No questions yet. Be the first!</p>}
          {questions.map(q => (
            <QuestionItem
              key={q._id} q={q} user={user} expanded={expanded === q._id} isHighlight={highlightQuestionId === q._id}
              answerText={answers[q._id] || ""} onToggle={() => setExpanded(expanded === q._id ? null : q._id)}
              onAnswerChange={(val) => setAnswers(a => ({ ...a, [q._id]: val }))} onSubmitAnswer={() => submitA(q._id)}
            />
          ))}
          {user ? (
            <div className="flex gap-2 pt-3 border-t-2 border-black">
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
