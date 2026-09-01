"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import { cn } from "@/utils/cn";

export interface FilterBarSelectConfig {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export interface FilterBarProps {
  /** Omit both searchValue and onSearchChange for a filters-only bar (e.g. status-only filtering). */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters: FilterBarSelectConfig[];
  onClear: () => void;
  className?: string;
}

export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters,
  onClear,
  className,
}: FilterBarProps) {
  const hasSearch = searchValue !== undefined && onSearchChange !== undefined;

  const [localSearch, setLocalSearch] = useState(searchValue ?? "");
  const [lastSeenSearchValue, setLastSeenSearchValue] = useState(searchValue ?? "");
  const debouncedSearch = useDebouncedValue(localSearch, 400);

  // Push the debounced value up once it settles.
  useEffect(() => {
    if (hasSearch && debouncedSearch !== searchValue) {
      onSearchChange(debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Reflect external changes (e.g. a Clear button, or a URL-seeded initial value) back into the
  // input by adjusting state during render rather than in an effect (avoids an extra render pass).
  if (hasSearch && searchValue !== lastSeenSearchValue) {
    setLastSeenSearchValue(searchValue);
    setLocalSearch(searchValue);
  }

  const hasActiveFilters = Boolean(searchValue) || filters.some((f) => f.value);

  return (
    <div
      className={cn(
        "bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-end gap-4",
        className
      )}
    >
      {hasSearch && (
        <div className="flex-1 min-w-0">
          <Input
            icon={<Search className="w-4 h-4" aria-hidden="true" />}
            placeholder={searchPlaceholder}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            aria-label={searchPlaceholder}
          />
        </div>
      )}

      {filters.map((filter) => (
        <div key={filter.key} className="w-full sm:w-48 shrink-0">
          <Select
            aria-label={filter.label}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            options={filter.options}
          />
        </div>
      ))}

      {hasActiveFilters && (
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={onClear}
          className="shrink-0 text-gray-500"
        >
          <X className="w-4 h-4" aria-hidden="true" />
          Clear
        </Button>
      )}
    </div>
  );
}

export default FilterBar;
