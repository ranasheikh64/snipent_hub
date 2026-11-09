"use client";

import React, { useState } from "react";
import { BrutalistButton } from "@/frontend/components/ui/BrutalistButton";
import { BrutalistInput } from "@/frontend/components/ui/BrutalistInput";
import { useAuth } from "@/frontend/hooks/useAuth";
import { GithubIcon } from "@/frontend/components/ui/GithubIcon";
import { getApiUrl } from "@/frontend/config/api";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = isRegister
        ? await register(name, email, password)
        : await login(email, password);
      if (res.success) {
        onClose();
      } else {
        setError(res.message || "Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] w-full max-w-md overflow-hidden">
        <div className="border-b-2 border-black p-4 bg-[#FFEAE5] flex items-center justify-between">
          <h2 className="font-black text-lg uppercase tracking-wide">
            {isRegister ? "Create DevVault Account" : "Welcome Back"}
          </h2>
          <button onClick={onClose} className="p-1 border border-black bg-white cursor-pointer hover:bg-neutral-100">
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <a
            href={getApiUrl("/api/auth/github")}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-black text-white font-mono font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#EF4444] neo-press cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Continue with GitHub</span>
          </a>

          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 border-t border-black" />
            <span className="text-[10px] font-mono font-bold uppercase text-neutral-500">OR WITH EMAIL</span>
            <div className="flex-1 border-t border-black" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {isRegister && (
              <BrutalistInput placeholder="YOUR NAME" value={name} onChange={(e) => setName(e.target.value)} required />
            )}
            <BrutalistInput type="email" placeholder="EMAIL ADDRESS" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <BrutalistInput type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} required />

            {error && <p className="text-xs font-mono font-bold text-red-600 bg-red-50 p-2 border border-red-500">{error}</p>}

            <BrutalistButton type="submit" variant="primary" size="md" className="w-full" disabled={loading}>
              {loading ? "Processing..." : isRegister ? "Sign Up" : "Log In"}
            </BrutalistButton>
          </form>

          <p className="text-center font-mono text-xs pt-1">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => { setIsRegister(!isRegister); setError(""); }}
              className="font-bold underline text-red-600 cursor-pointer"
            >
              {isRegister ? "Log In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
