import React from "react";
import { clsx } from "clsx";

export interface BrutalistInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const BrutalistInput: React.FC<BrutalistInputProps> = ({
  className,
  error,
  ...props
}) => {
  return (
    <div className="w-full">
      <input
        className={clsx(
          "w-full bg-white text-black font-mono text-sm px-4 py-2.5",
          "border-2 border-black placeholder:text-neutral-500",
          "focus:outline-none focus:bg-emerald-50 focus:ring-0",
          "shadow-[3px_3px_0px_#000]",
          error && "border-red-600 bg-red-50",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs font-bold text-red-600">{error}</p>}
    </div>
  );
};

