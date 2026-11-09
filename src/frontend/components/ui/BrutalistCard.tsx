import React from "react";
import { clsx } from "clsx";

export interface BrutalistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const BrutalistCard: React.FC<BrutalistCardProps> = ({
  children,
  className,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000]",
        hoverEffect &&
          "transition-all duration-150 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

