"use client";

import React, { useState } from "react";
import { BrutalistButton } from "@/frontend/components/ui/BrutalistButton";
import { BrutalistInput } from "@/frontend/components/ui/BrutalistInput";
import { X } from "lucide-react";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🚀");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/communities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, icon }),
      });
      if (res.ok) {
        onCreated();
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] w-full max-w-md overflow-hidden">
        <div className="border-b-2 border-black p-4 bg-amber-300 flex items-center justify-between">
          <h2 className="font-black text-lg uppercase tracking-wider text-black">
            + Create Developer Community
          </h2>
          <button onClick={onClose} className="p-1 border border-black bg-white hover:bg-neutral-100 cursor-pointer">
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex gap-2">
            <select
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="bg-white border-2 border-black px-3 py-2 text-xl"
            >
              <option value="🚀">🚀</option>
              <option value="💙">💙</option>
              <option value="⚛️">⚛️</option>
              <option value="⚡">⚡</option>
              <option value="🐍">🐍</option>
              <option value="🦀">🦀</option>
            </select>
            <BrutalistInput
              placeholder="COMMUNITY NAME (E.G. FLUTTER BANGLADESH)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <textarea
            placeholder="What is the focus of this developer community?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-white border-2 border-black p-2.5 text-xs font-mono focus:outline-none"
          />

          <div className="pt-2 flex justify-end gap-2">
            <BrutalistButton type="button" variant="white" size="sm" onClick={onClose}>
              Cancel
            </BrutalistButton>
            <BrutalistButton type="submit" variant="primary" size="sm" disabled={loading}>
              {loading ? "Creating..." : "Create Space"}
            </BrutalistButton>
          </div>
        </form>
      </div>
    </div>
  );
};

