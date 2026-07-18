import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Button from "./Button";

interface TagsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

export function TagsInput({
  value = [],
  onChange,
  label,
  placeholder = "Add a tag...",
  error,
  className,
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium text-gray-900">{label}</label>}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "flex-1 rounded-lg border bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500",
            error ? "border-red-500" : "border-gray-200"
          )}
        />
        <Button type="button" variant="outline" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800 border border-orange-200"
          >
            {item}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="ml-1 rounded-full p-0.5 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
