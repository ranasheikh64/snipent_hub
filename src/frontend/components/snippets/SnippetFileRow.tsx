"use client";

import React from "react";
import { Trash2, FileCode } from "lucide-react";

interface SnippetFileRowProps {
  filename: string;
  code: string;
  purpose?: string;
  fileIndex: number;
  totalFiles: number;
  canDelete: boolean;
  onFilenameChange: (val: string) => void;
  onCodeChange: (val: string) => void;
  onPurposeChange: (val: string) => void;
  onDelete: () => void;
}

export const SnippetFileRow: React.FC<SnippetFileRowProps> = ({
  filename, code, purpose, fileIndex, totalFiles,
  canDelete, onFilenameChange, onCodeChange, onPurposeChange, onDelete,
}) => {
  return (
    <div className="border-2 border-black bg-neutral-50 overflow-hidden">
      {/* File Header */}
      <div className="flex items-center gap-2 bg-[#F5F3FF] border-b-2 border-black px-3 py-2">
        <span className="flex items-center gap-1 text-[10px] font-black text-[#7C3AED] bg-white border border-[#7C3AED] px-1.5 py-0.5 shrink-0">
          <FileCode className="w-3 h-3" />
          FILE {fileIndex + 1}/{totalFiles}
        </span>
        <input
          type="text"
          value={filename}
          onChange={(e) => onFilenameChange(e.target.value)}
          placeholder="filename.dart"
          className="flex-1 bg-white border border-black px-2 py-1 text-xs font-mono focus:outline-none focus:border-[#7C3AED]"
        />
        {canDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="p-1 border border-black bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Purpose / Role Description */}
      <div className="px-3 py-2 border-b border-black/20 bg-white">
        <input
          type="text"
          value={purpose || ""}
          onChange={(e) => onPurposeChange(e.target.value)}
          placeholder="📌 File purpose (e.g. Google Auth Service, Initialize Firebase, Main entry point)"
          className="w-full text-[11px] font-mono text-neutral-600 bg-[#FDFBF7] border border-dashed border-neutral-400 px-2 py-1.5 focus:outline-none focus:border-[#7C3AED] italic"
        />
      </div>

      {/* Code Editor */}
      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        rows={12}
        placeholder="// Paste your code here..."
        className="w-full bg-neutral-900 text-emerald-400 font-mono text-xs p-3 focus:outline-none resize-y"
        required
      />
    </div>
  );
};
