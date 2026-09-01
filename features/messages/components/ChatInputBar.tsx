import type { RefObject } from "react";
import { Paperclip } from "lucide-react";
import Button from "@/components/ui/Button";
import { Loading } from "@/components/ui/Loading";

const VARIANT_STYLES = {
  student: {
    container: "p-4 border-t border-gray-100 bg-white",
    attachButton: "p-2.5 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-colors focus-ring disabled:opacity-50",
    spinnerClassName: "w-5 h-5 text-gray-500",
    textInput:
      "flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
    placeholder: "Type your message...",
    fileInputId: "chat-file-upload",
  },
  admin: {
    container: "p-4 border-t border-gray-200 bg-gray-50",
    attachButton:
      "p-2.5 bg-white text-gray-500 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors focus-ring disabled:opacity-50",
    spinnerClassName: "w-5 h-5 text-slate-400",
    textInput:
      "flex-1 bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
    placeholder: "Type a message...",
    fileInputId: "admin-chat-file-upload",
  },
} as const;

interface ChatInputBarProps {
  variant: keyof typeof VARIANT_STYLES;
  inputText: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (e: React.FormEvent) => void;
  onFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  isSending: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  fileAccept: string;
}

export function ChatInputBar({
  variant,
  inputText,
  onInputChange,
  onSend,
  onFileSelected,
  isUploading,
  isSending,
  fileInputRef,
  fileAccept,
}: ChatInputBarProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div className={styles.container}>
      <form onSubmit={onSend} className="flex gap-2 items-center">
        <input
          type="file"
          id={styles.fileInputId}
          ref={fileInputRef}
          onChange={onFileSelected}
          className="hidden"
          accept={fileAccept}
        />

        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className={styles.attachButton}
          title="Upload picture or file"
        >
          {isUploading ? <Loading variant="icon" className={styles.spinnerClassName} /> : <Paperclip className="w-5 h-5" />}
        </button>

        <input
          type="text"
          placeholder={styles.placeholder}
          value={inputText}
          onChange={onInputChange}
          className={styles.textInput}
        />

        <Button type="submit" variant="primary" isLoading={isSending}>
          Send
        </Button>
      </form>
    </div>
  );
}
