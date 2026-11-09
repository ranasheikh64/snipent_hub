"use client";

import React, { useState, useEffect } from "react";
import { BrutalistButton } from "@/frontend/components/ui/BrutalistButton";
import { CopyButton } from "@/frontend/components/snippets/CopyButton";
import { X, Plus, Terminal } from "lucide-react";

interface QuickNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuickNote {
  id: string;
  title: string;
  command: string;
}

export const QuickNotesModal: React.FC<QuickNotesModalProps> = ({ isOpen, onClose }) => {
  const [notes, setNotes] = useState<QuickNote[]>([
    {
      id: "1",
      title: "Flutter Clean & Re-fetch Pods",
      command: "flutter clean && flutter pub get && cd ios && pod update && cd ..",
    },
    {
      id: "2",
      title: "Generate Flutter App Icons",
      command: "dart run flutter_launcher_icons",
    },
    {
      id: "3",
      title: "Kill Port 3000 (Mac / Linux)",
      command: "npx kill-port 3000",
    },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newCommand, setNewCommand] = useState("");

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCommand.trim()) return;
    setNotes([...notes, { id: Date.now().toString(), title: newTitle, command: newCommand }]);
    setNewTitle("");
    setNewCommand("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden">
        <div className="border-b-2 border-black p-4 bg-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-black" />
            <h2 className="font-black text-sm uppercase tracking-wider text-black">
              Developer Quick Notes & Cheats
            </h2>
          </div>
          <button onClick={onClose} className="p-1 border border-black bg-white hover:bg-neutral-100 cursor-pointer">
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4">
          <form onSubmit={handleAdd} className="border-2 border-black p-3 bg-neutral-50 space-y-2">
            <input
              type="text"
              placeholder="Note title (e.g. Git force pull)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-white border border-black px-2 py-1 text-xs font-mono"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Command / snippet string..."
                value={newCommand}
                onChange={(e) => setNewCommand(e.target.value)}
                className="flex-1 bg-white border border-black px-2 py-1 text-xs font-mono"
              />
              <BrutalistButton type="submit" variant="dark" size="sm">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add
              </BrutalistButton>
            </div>
          </form>

          <div className="space-y-2">
            {notes.map((note) => (
              <div key={note.id} className="border-2 border-black p-3 bg-white shadow-[2px_2px_0px_#000]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-xs text-black">{note.title}</span>
                  <CopyButton textToCopy={note.command} label="Copy" />
                </div>
                <code className="block bg-neutral-900 text-emerald-400 p-2 text-xs font-mono border border-black overflow-x-auto">
                  {note.command}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

