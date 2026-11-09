"use client";

import React, { useState } from "react";
import { SnippetItem } from "@/frontend/types/snippet";
import { CodeTabsViewer } from "./CodeTabsViewer";
import { SnippetQABox } from "./SnippetQABox";
import { GithubIcon } from "@/frontend/components/ui/GithubIcon";
import { X, Calendar, User, Eye, Download, GitFork, Play } from "lucide-react";

interface SnippetDetailModalProps {
  snippet: SnippetItem | null;
  onClose: () => void;
  onForked?: () => void;
}

export const SnippetDetailModal: React.FC<SnippetDetailModalProps> = ({ snippet, onClose, onForked }) => {
  const [forking, setForking] = useState(false);
  const [forkedMsg, setForkedMsg] = useState(false);
  if (!snippet) return null;

  const handleExportGist = () => {
    const f = snippet.files[0];
    const encoded = encodeURIComponent(f?.code || "");
    window.open(`https://gist.github.com/?filename=${encodeURIComponent(f?.filename || "snippet.dart")}&content=${encoded}`, "_blank");
  };

  const handleDownload = () => {
    snippet.files.forEach((f) => {
      const blob = new Blob([f.code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = f.filename;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const handleFork = async () => {
    setForking(true);
    try {
      const res = await fetch(`/api/snippets/${snippet.id}/fork`, { method: "POST" });
      if (res.ok) {
        setForkedMsg(true);
        setTimeout(() => setForkedMsg(false), 3000);
        onForked?.();
      }
    } finally { setForking(false); }
  };

  const isDart = snippet.technology.toLowerCase() === "flutter" || snippet.technology.toLowerCase() === "dart";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="border-b-2 border-black p-4 bg-[#FFEAE5] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black">{snippet.technology}</span>
              <span className="bg-white text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black">{snippet.category}</span>
            </div>
            <h2 className="font-black text-xl text-black uppercase leading-tight">{snippet.title}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center neo-press hover:bg-neutral-100 cursor-pointer">
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          <p className="text-sm font-mono text-neutral-800 bg-neutral-100 p-3 border border-black">{snippet.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {snippet.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {snippet.createdAt.substring(0, 10)}</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> Copied {snippet.copyCount} times</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleFork} disabled={forking} className="flex items-center gap-1 px-2.5 py-1 bg-amber-400 text-black text-xs font-bold border border-black neo-press cursor-pointer">
                <GitFork className="w-3.5 h-3.5" /> {forkedMsg ? "Forked!" : "Fork"}
              </button>
              {isDart && (
                <a href="https://dartpad.dev/" target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1 bg-emerald-400 text-black text-xs font-bold border border-black neo-press cursor-pointer">
                  <Play className="w-3.5 h-3.5" /> DartPad
                </a>
              )}
              <button onClick={handleExportGist} className="flex items-center gap-1 px-2.5 py-1 bg-black text-white text-xs font-bold border border-black neo-press cursor-pointer">
                <GithubIcon className="w-3.5 h-3.5" /> Gist
              </button>
              <button onClick={handleDownload} className="flex items-center gap-1 px-2.5 py-1 bg-white text-black text-xs font-bold border border-black neo-press cursor-pointer hover:bg-neutral-100">
                <Download className="w-3.5 h-3.5" /> Save
              </button>
            </div>
          </div>

          <CodeTabsViewer files={snippet.files} snippetId={snippet.id} />
          <SnippetQABox snippetId={snippet.id} />
          <div className="flex flex-wrap gap-1.5 pt-2">
            {snippet.tags.map((tag, idx) => (
              <span key={idx} className="bg-neutral-200 text-black text-[11px] font-mono px-2 py-0.5 border border-black">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
