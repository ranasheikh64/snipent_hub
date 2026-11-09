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
      <div className="flex items-center justify-between border-b-2 border-black bg-neutral-800 px-2 py-1.5 overflow-x-auto">
        <div className="flex items-center gap-1">
          {files.map((file, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold border border-black cursor-pointer transition-colors ${
                activeTab === idx
                  ? "bg-white text-black shadow-[1.5px_1.5px_0px_#000]"
                  : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{file.filename}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-neutral-400 uppercase hidden sm:inline">
            {currentFile?.language}
          </span>
          <CopyButton
            textToCopy={currentFile?.code || ""}
            snippetId={snippetId}
            label="Copy"
          />
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto max-h-96">
        <pre className="font-mono text-xs text-neutral-100 leading-relaxed">
          <code>{currentFile?.code}</code>
        </pre>
      </div>
    </div>
  );
};

