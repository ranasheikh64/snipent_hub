"use client";

import React from "react";
import { Trash2 } from "lucide-react";

interface SnippetFileRowProps {
  filename: string;
  code: string;
  canDelete: boolean;
  onFilenameChange: (val: string) => void;
  onCodeChange: (val: string) => void;
  onDelete: () => void;
}

export const SnippetFileRow: React.FC<SnippetFileRowProps> = ({
  filename,
  code,
  canDelete,
  onFilenameChange,
  onCodeChange,
  onDelete,
}) => {
  return (
    <div className="border-2 border-black p-3 bg-neutral-50 space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={filename}
          onChange={(e) => onFilenameChange(e.target.value)}
          placeholder="filename (e.g. custom_button.dart)"
          className="flex-1 bg-white border border-black px-2 py-1 text-xs font-mono"
        />
        {canDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="p-1 border border-black bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        rows={4}
        placeholder="// Paste code here..."
        className="w-full bg-neutral-900 text-emerald-400 font-mono text-xs p-2 border border-black focus:outline-none"
        required
      />
    </div>
  );
};

