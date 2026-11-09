"use client";

import React from "react";
import { BlogPost } from "@/frontend/types/blog";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  blog: BlogPost;
  onOpenBlog: (blog: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, onOpenBlog }) => {
  return (
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]">
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black">
              {blog.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-neutral-600">
              <Clock className="w-3.5 h-3.5" /> {blog.readTime}
            </span>
          </div>

          <h3
            onClick={() => onOpenBlog(blog)}
            className="font-black text-lg uppercase text-black line-clamp-2 hover:text-emerald-600 cursor-pointer mb-2 leading-snug"
          >
            {blog.title}
          </h3>

          <p className="text-xs font-mono text-neutral-700 line-clamp-3 mb-4">
            {blog.excerpt}
          </p>
        </div>

        <div>
          <div className="border-t-2 border-black mb-3" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              BY {blog.author.toUpperCase()}
            </span>
            <button
              onClick={() => onOpenBlog(blog)}
              className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-black hover:text-red-600 cursor-pointer"
            >
              <span>Read Guide</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

