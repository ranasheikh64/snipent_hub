import React from "react";
import { clsx } from "clsx";

export interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "amber" | "dark" | "outline" | "white" | "purple";
  size?: "sm" | "md" | "lg";
}

export const BrutalistButton: React.FC<BrutalistButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-wide uppercase transition-all neo-press cursor-pointer border-2 border-black";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs shadow-[2px_2px_0px_#000] active:shadow-none",
    md: "px-4 py-2 text-sm shadow-[3px_3px_0px_#000] active:shadow-none",
    lg: "px-6 py-3 text-base shadow-[4px_4px_0px_#000] active:shadow-none",
  };

  const variantStyles = {
    primary: "bg-[#7C3AED] text-white hover:bg-[#6D28D9]",
    purple: "bg-[#7C3AED] text-white hover:bg-[#6D28D9]",
    danger: "bg-red-600 text-white hover:bg-red-500",
    amber: "bg-amber-400 text-black hover:bg-amber-300",
    dark: "bg-black text-white hover:bg-neutral-800",
    outline: "bg-transparent text-black hover:bg-neutral-100",
    white: "bg-white text-black hover:bg-neutral-100",
  };

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
