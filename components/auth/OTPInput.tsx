"use client";

import React, { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/utils/cn";

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  className,
  autoFocus = false,
}: OTPInputProps) {
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (!/^[0-9]*$/.test(val)) return;

    let newValue = value.split("");
    // Handle single character
    newValue[index] = val.substring(val.length - 1);
    const finalValue = newValue.join("");
    onChange(finalValue);

    // Auto advance
    if (val && index < length - 1) {
      setActiveOTPIndex(index + 1);
    }

    if (finalValue.length === length) {
      onComplete?.(finalValue);
    }
  };

  const handleOnKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      let newValue = value.split("");
      newValue[index] = "";
      onChange(newValue.join(""));
      if (index > 0) setActiveOTPIndex(index - 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) setActiveOTPIndex(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index < length - 1) setActiveOTPIndex(index + 1);
    }
  };

  const handleOnPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (!/^[0-9]*$/.test(pastedData)) return;

    const pastedValue = pastedData.slice(0, length);
    onChange(pastedValue);

    if (pastedValue.length === length) {
      onComplete?.(pastedValue);
      setActiveOTPIndex(length - 1);
    } else {
      setActiveOTPIndex(pastedValue.length);
    }
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  return (
    <div
      className={cn("flex justify-center items-center gap-2 sm:gap-3", className)}
      onPaste={handleOnPaste}
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={index === activeOTPIndex ? inputRef : null}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          autoFocus={autoFocus && index === 0}
          className={cn(
            "w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-white border border-gray-200 rounded-xl",
            "focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all",
            "shadow-sm"
          )}
          value={value[index] || ""}
          onChange={(e) => handleOnChange(e, index)}
          onKeyDown={(e) => handleOnKeyDown(e, index)}
          onClick={() => setActiveOTPIndex(index)}
        />
      ))}
    </div>
  );
}
