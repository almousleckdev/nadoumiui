import React from "react";
import { cn } from "@/utils/cn";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  className?: string;
  wrapperClassName?: string;
}

export function Table({ className, wrapperClassName, ...props }: TableProps) {
  return (
    <div className={cn("w-full overflow-auto", wrapperClassName)}>
      <table className={cn("w-full text-sm text-left", className)} {...props} />
    </div>
  );
}

export function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        "bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider border-b border-gray-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800",
        className,
      )}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn(
        "divide-y divide-gray-200 dark:divide-slate-800",
        className,
      )}
      {...props}
    />
  );
}

export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "hover:bg-gray-50 transition-colors dark:hover:bg-slate-800/50",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "px-6 py-4 font-bold align-middle whitespace-nowrap",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-6 py-4 align-middle", className)} {...props} />;
}
