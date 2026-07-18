import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, options, placeholder, className, id, children, ...rest },
    ref,
  ) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${selectId}-error` : undefined}
            className={cn(
              // Base
              "w-full appearance-none rounded-lg border bg-white px-3 py-2 pr-10 text-sm text-gray-900",
              "transition-colors duration-150 ease-in-out",
              // Focus
              "focus:outline-none focus:ring-2 focus:ring-offset-1",
              // States
              hasError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-500",
              // Disabled
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
              className,
            )}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          {/* Chevron icon */}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        {hasError && (
          <p
            id={`${selectId}-error`}
            className="text-xs text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
export default Select;
