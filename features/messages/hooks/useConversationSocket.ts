import { useEffect, useRef, useState, type RefObject } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import type { Conversation, Message } from "@/types";

interface UseConversationSocketOptions {
  activeConv: Conversation | null;
  /** Returns the "other side" of the conversation — adminId for a student's view, studentId for an admin's view. */
  getPeerId: (conv: Conversation) => string | null | undefined;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

interface UseConversationSocketResult {
  isOnline: boolean;
  isTyping: boolean;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
  emitTyping: (isTyping: boolean) => void;
}

/**
 * Owns the socket.io connection lifecycle for a chat workspace: connecting,
 * joining/leaving the active conversation's room, listening for new
 * messages / read receipts / presence / typing, and keeping React Query's
 * cache in sync. Shared between the student and admin messages pages, which
 * previously duplicated ~70 lines of this each, differing only in whether
 * the "peer" is the conversation's adminId or studentId.
 */
export function useConversationSocket({
  activeConv,
  getPeerId,
  messagesEndRef,
}: UseConversationSocketOptions): UseConversationSocketResult {
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "http://localhost:3002";
    const peerId = activeConv ? getPeerId(activeConv) : null;

    const socket = io(backendUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      if (peerId) {
        socket.emit("presence:query", peerId);
      }
    });

    socket.on("message:new", (message: Message) => {
      if (activeConv && message.conversationId === activeConv.id) {
        queryClient.setQueryData<Message[]>(["messagesThread", activeConv.id], (old = []) => {
          if (old.some((m) => m.id === message.id)) return old;
          return [...old, message];
        });
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      queryClient.invalidateQueries({ queryKey: ["conversationsList"] });
    });

    socket.on("messages:read", ({ conversationId }: { conversationId: string }) => {
      if (activeConv && conversationId === activeConv.id) {
        queryClient.setQueryData<Message[]>(["messagesThread", activeConv.id], (old = []) =>
          old.map((m) => ({ ...m, status: "read" as const })),
        );
      }
    });

    socket.on("conversations:refresh", () => {
      queryClient.invalidateQueries({ queryKey: ["conversationsList"] });
    });

    socket.on("status:update", ({ userId, status }: { userId: string; status: string }) => {
      if (peerId && peerId === userId) {
        setIsOnline(status === "online");
      }
    });

    socket.on("presence:res", ({ userId, isOnline: online }: { userId: string; isOnline: boolean }) => {
      if (peerId && peerId === userId) {
        setIsOnline(online);
      }
    });

    socket.on("user:typing", ({ userId, isTyping: typing }: { userId: string; isTyping: boolean }) => {
      if (peerId && peerId === userId) {
        setIsTyping(typing);
      }
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- getPeerId is expected to be referentially stable (a plain field accessor)
  }, [activeConv, queryClient, messagesEndRef]);

  // Join/leave the active conversation's room.
  useEffect(() => {
    if (!socketRef.current || !activeConv) return;

    socketRef.current.emit("join:conversation", activeConv.id);
    const peerId = getPeerId(activeConv);
    if (peerId) {
      socketRef.current.emit("presence:query", peerId);
    }

    return () => {
      socketRef.current?.emit("leave:conversation", activeConv.id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConv]);

  const emitTyping = (typing: boolean) => {
    if (socketRef.current && activeConv) {
      socketRef.current.emit("typing", { conversationId: activeConv.id, isTyping: typing });
    }
  };

  return { isOnline, isTyping, isUploading, setIsUploading, emitTyping };
}
