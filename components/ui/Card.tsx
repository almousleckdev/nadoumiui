import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}

function Card({ className, children, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        // Base
        "rounded-2xl border border-gray-100 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200",
        // Hover lift effect
        hover && [
          "transition-all duration-200 ease-in-out",
          "hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-slate-800/50",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}

Card.displayName = "Card";

export { Card };
export default Card;
