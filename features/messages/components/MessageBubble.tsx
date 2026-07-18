import Image from "next/image";
import { Check, CheckCheck, Download, type LucideIcon } from "lucide-react";
import type { Message } from "@/types";
import { resolveDocumentUrl } from "@/utils/resolveUrl";

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  fileIcon: LucideIcon;
  checkIconClassName?: string;
  checkIconStrokeWidth?: number;
}

export function MessageBubble({
  message,
  isOwnMessage,
  fileIcon: FileIcon,
  checkIconClassName = "w-4 h-4",
  checkIconStrokeWidth,
}: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
          isOwnMessage ? "bg-green-600 text-white rounded-tr-none" : "bg-amber-500 text-white rounded-tl-none"
        }`}
      >
        {message.type === "image" && message.fileUrl && (
          <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
            <a href={resolveDocumentUrl(message.fileUrl)} target="_blank" rel="noopener noreferrer">
              <Image
                src={resolveDocumentUrl(message.fileUrl)}
                alt={message.fileName || "Uploaded Image"}
                width={300}
                height={200}
                unoptimized
                className="max-w-full max-h-48 object-cover hover:scale-105 transition-transform duration-250 cursor-zoom-in rounded-lg"
              />
            </a>
          </div>
        )}

        {message.type === "file" && message.fileUrl && (
          <div className="mb-2 rounded-lg p-2.5 bg-black/10 border border-white/10 flex items-center gap-2.5">
            <FileIcon className="w-5 h-5 text-white shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold block truncate text-white">{message.fileName}</span>
              <span className="text-[10px] block opacity-75 text-white">{message.fileSize}</span>
            </div>
            <a
              href={resolveDocumentUrl(message.fileUrl)}
              download={message.fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        )}

        <p className="leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>

        <div className="flex items-center justify-end gap-1.5 mt-1 opacity-75">
          <span className="text-[9px] text-white">
            {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          {isOwnMessage && (
            <span className="text-white shrink-0">
              {message.status === "read" ? (
                <CheckCheck className={`${checkIconClassName} text-cyan-200`} strokeWidth={checkIconStrokeWidth} />
              ) : (
                <Check className={`${checkIconClassName} text-white/85`} strokeWidth={checkIconStrokeWidth} />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
