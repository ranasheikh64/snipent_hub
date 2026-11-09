import React from "react";
import Image from "next/image";
import logoImg from "../../../../public/logo-full.png";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F5F3FF] border-t-2 border-black mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-300">
          <div className="md:col-span-2">
            <div className="flex items-center mb-3">
              <Image
                src={logoImg}
                alt="SnippetHub"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-neutral-600 max-w-sm pl-3 border-l-2 border-[#7C3AED]">
              Save • Organize • Reuse • Share.
              Personal developer knowledge hub and open-source code snippet library.
            </p>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-black mb-3">Platform</h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-700">
              <li>Flutter Snippets</li>
              <li>Backend & APIs</li>
              <li>UI Components</li>
              <li>Developer Notes</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-black mb-3">Community</h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-700">
              <li>Open Source Library</li>
              <li>Developer Spaces</li>
              <li>GitHub Gist Integration</li>
              <li>MongoDB Atlas Storage</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600">
          <span>&copy; 2026 SNIPPETHUB. ALL RIGHTS RESERVED.</span>
          <span className="bg-[#7C3AED] text-white font-black px-3 py-1 border border-black uppercase text-[10px]">
            BUILT FOR LIFELONG DEVELOPERS
          </span>
        </div>
      </div>
    </footer>
  );
};
