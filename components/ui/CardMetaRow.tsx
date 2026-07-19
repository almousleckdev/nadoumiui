import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CardMetaRowProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  valueClassName?: string;
}

export function CardMetaRow({ icon, label, value, valueClassName }: CardMetaRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="flex items-center gap-1.5 text-gray-500">
        <span className="text-gray-400" aria-hidden="true">
          {icon}
        </span>
        {label}
      </span>
      <span className={cn("font-semibold text-gray-900 text-right truncate max-w-[60%]", valueClassName)}>
        {value}
      </span>
    </div>
  );
}

export default CardMetaRow;
