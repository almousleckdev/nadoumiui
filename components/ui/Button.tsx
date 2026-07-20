import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

// Types   
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
}

//Style mappings 
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800 focus-visible:ring-orange-500",
  secondary:
    "bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700 focus-visible:ring-gray-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-600 dark:focus-visible:ring-slate-500",
  outline:
    "border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-orange-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-orange-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:active:bg-slate-700 dark:hover:text-slate-200",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500 dark:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1.5 text-xs gap-1.5",
  md: "px-4 py-1.5 text-sm gap-2",
  lg: "px-5 py-2.5 text-sm gap-2 font-semibold",
};

function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn("animate-spin", className)} />;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className,
      children,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium rounded-lg",
          "transition-colors duration-150 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          // Variant & size
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...rest}
      >
        {isLoading && <Spinner className="shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;
