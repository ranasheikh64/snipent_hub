"use client";

import React from "react";
import { CornerDownRight, MessageCircle, Send } from "lucide-react";

interface QuestionItemProps {
  q: any;
  user: any;
  expanded: boolean;
  isHighlight: boolean;
  answerText: string;
  onToggle: () => void;
  onAnswerChange: (val: string) => void;
  onSubmitAnswer: () => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  q, user, expanded, isHighlight, answerText, onToggle, onAnswerChange, onSubmitAnswer,
}) => (
  <div className={`border-2 border-black p-3 space-y-2 ${isHighlight ? "bg-purple-50 ring-2 ring-[#7C3AED]" : "bg-neutral-50"}`}>
    <div className="flex items-start justify-between gap-2">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase text-white bg-[#7C3AED] px-1.5 py-0.5 border border-black">Question</span>
          <span className="text-[10px] font-mono text-neutral-500">by {q.author}</span>
        </div>
        <p className="text-xs font-mono mt-1 font-semibold text-black">{q.content}</p>
      </div>
      <button onClick={onToggle} className="text-[10px] font-bold text-neutral-600 hover:text-[#7C3AED] flex items-center gap-1 cursor-pointer border border-black bg-white px-2 py-0.5 shadow-[1px_1px_0px_#000]">
        <MessageCircle className="w-3 h-3 text-[#7C3AED]" /> {q.answers.length} {expanded ? "Close" : "Replies"}
      </button>
    </div>

    {expanded && (
      <div className="mt-3 pl-4 border-l-3 border-[#7C3AED] space-y-2 pt-2">
        {q.answers.map((a: any, i: number) => (
          <div key={i} className="bg-white border border-black p-2.5 shadow-[2px_2px_0px_#000]">
            <div className="flex items-center gap-1.5 mb-0.5">
              <CornerDownRight className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px] font-black text-emerald-700 uppercase bg-emerald-50 px-1 border border-emerald-300">Reply</span>
              <span className="text-[10px] font-mono text-neutral-500">by {a.author}</span>
            </div>
            <p className="text-xs font-mono text-neutral-800 pl-4">{a.content}</p>
          </div>
        ))}
        {user ? (
          <div className="flex gap-1.5 pt-2">
            <input value={answerText} onChange={e => onAnswerChange(e.target.value)} onKeyDown={e => e.key === "Enter" && onSubmitAnswer()}
              placeholder="Write your answer..." className="flex-1 text-xs font-mono border-2 border-black px-2 py-1.5 bg-white focus:outline-none focus:border-[#7C3AED]" />
            <button onClick={onSubmitAnswer} className="px-3 py-1.5 bg-[#7C3AED] text-white text-xs font-bold border-2 border-black cursor-pointer hover:bg-[#6D28D9] flex items-center gap-1">
              <Send className="w-3 h-3" /> Send
            </button>
          </div>
        ) : (
          <p className="text-[10px] font-mono text-neutral-500">Log in to write a reply</p>
        )}
      </div>
    )}
  </div>
);

