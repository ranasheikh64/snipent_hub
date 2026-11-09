"use client";

import React, { useState } from "react";
import { SnippetFile } from "@/frontend/types/snippet";
import { CopyButton } from "./CopyButton";
import { FileCode } from "lucide-react";

interface CodeTabsViewerProps {
  files: SnippetFile[];
  snippetId: string;
}

export const CodeTabsViewer: React.FC<CodeTabsViewerProps> = ({ files, snippetId }) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentFile = files[activeTab] || files[0];

  if (!files || files.length === 0) {
    return <div className="p-4 text-xs font-mono">No code files attached.</div>;
  }

  return (
    <div className="border-2 border-black bg-neutral-900 shadow-[3px_3px_0px_#000] overflow-hidden">
      {/* Tab Header Bar */}
      <div className="flex items-center justify-between border-b-2 border-black bg-neutral-800 px-2 py-1.5 overflow-x-auto gap-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {files.map((file, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex flex-col items-start px-3 py-1 text-xs font-mono border border-black cursor-pointer transition-colors shrink-0 ${
                activeTab === idx
                  ? "bg-white text-black shadow-[1.5px_1.5px_0px_#000]"
                  : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                <FileCode className="w-3.5 h-3.5" />
                <span>{file.filename}</span>
              </div>
              {file.purpose && (
                <span className={`text-[9px] mt-0.5 ${activeTab === idx ? "text-[#7C3AED]" : "text-neutral-400"}`}>
                  {file.purpose}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono text-neutral-400 uppercase hidden sm:inline">
            {currentFile?.language}
          </span>
          <CopyButton textToCopy={currentFile?.code || ""} snippetId={snippetId} label="Copy" />
        </div>
      </div>

      {/* Purpose Banner (when file has a purpose) */}
      {currentFile?.purpose && (
        <div className="bg-[#7C3AED]/10 border-b border-[#7C3AED]/30 px-4 py-1.5 flex items-center gap-2">
          <span className="text-[10px] text-[#7C3AED] font-mono font-bold">📌 {currentFile.purpose}</span>
          {files.length > 1 && (
            <span className="text-[9px] text-neutral-400 font-mono">
              (File {activeTab + 1} of {files.length})
            </span>
          )}
        </div>
      )}

      {/* Code Area */}
      <div className="p-4 overflow-auto max-h-[500px]">
        <pre className="font-mono text-xs text-neutral-100 leading-relaxed">
          <code>{currentFile?.code}</code>
        </pre>
      </div>
    </div>
  );
};
