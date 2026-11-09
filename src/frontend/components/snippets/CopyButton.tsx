"use client";

import React from "react";
import { Check, Copy } from "lucide-react";
import { useClipboard } from "@/frontend/hooks/useClipboard";

interface CopyButtonProps {
  textToCopy: string;
  snippetId?: string;
  onCopySuccess?: () => void;
  className?: string;
  label?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  snippetId,
  onCopySuccess,
  className,
  label = "Copy Code",
}) => {
  const { hasCopied, copy } = useClipboard();

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const ok = await copy(textToCopy);
    if (ok) {
      if (snippetId) {
        fetch(`/api/snippets/${snippetId}/copy`, { method: "POST" }).catch(() => null);
      }
      onCopySuccess?.();
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] neo-press cursor-pointer transition-colors ${
        hasCopied
          ? "bg-emerald-400 text-black border-black"
          : "bg-white text-black hover:bg-neutral-100"
      } ${className || ""}`}
    >
      {hasCopied ? (
        <>
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

