import React from "react";
import { clsx } from "clsx";

export interface BrutalistBadgeProps {
  children: React.ReactNode;
  variant?: "dark" | "white" | "emerald" | "amber" | "outline";
  className?: string;
}

export const BrutalistBadge: React.FC<BrutalistBadgeProps> = ({
  children,
  variant = "white",
  className,
}) => {
  const variantStyles = {
    dark: "bg-black text-white",
    white: "bg-white text-black",
    emerald: "bg-emerald-400 text-black",
    amber: "bg-amber-300 text-black",
    outline: "bg-transparent text-black",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-black uppercase tracking-wider",
        "border-2 border-black shadow-[1.5px_1.5px_0px_#000]",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

