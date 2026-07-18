"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

type ModalSize = "sm" | "md" | "lg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSize;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  const focusableEls = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  if (focusableEls.length === 0) return;

  const first = focusableEls[0];
  const last = focusableEls[focusableEls.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  /*Mount portal target*/
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  /* Show / hide animation */
  useEffect(() => {
    if (isOpen) {
      // Store the element that was focused before the modal opened
      previousActiveElement.current = document.activeElement;
      // Small delay so CSS transition picks up the state change
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    } else {
      const frame = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(frame);
    }
  }, [isOpen]);

  /* Restore focus on close */
  useEffect(() => {
    if (!isOpen && previousActiveElement.current instanceof HTMLElement) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [isOpen]);

  /*Escape key handler */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && overlayRef.current) {
        trapFocus(overlayRef.current, event);
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  /* Lock body scroll */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  /* Auto-focus first focusable element */
  useEffect(() => {
    if (isOpen && visible && overlayRef.current) {
      const first = overlayRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      first?.focus();
    }
  }, [isOpen, visible]);

  /* Render nothing if not mounted (SSR) or not open */
  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Dialog"}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "transition-opacity duration-200 ease-in-out",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "relative z-10 w-full rounded-2xl bg-white shadow-xl",
          "transition-all duration-200 ease-in-out",
          visible
            ? "translate-y-0 scale-100"
            : "translate-y-4 scale-95",
          sizeStyles[size]
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900 font-[Outfit]">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "rounded-lg p-1.5 text-gray-400",
                "hover:bg-gray-100 hover:text-gray-600",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                "transition-colors duration-150"
              )}
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.displayName = "Modal";

export { Modal };
export default Modal;
