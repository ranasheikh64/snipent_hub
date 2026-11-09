import { useState, useCallback } from "react";

export function useClipboard(timeout = 2000) {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (!navigator.clipboard) {
        return false;
      }
      try {
        await navigator.clipboard.writeText(text);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), timeout);
        return true;
      } catch (err) {
        console.error("Clipboard copy failed:", err);
        return false;
      }
    },
    [timeout]
  );

  return { hasCopied, copy };
}

