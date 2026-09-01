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
  const activeConvRef = useRef<Conversation | null>(activeConv);
  const getPeerIdRef = useRef(getPeerId);
  const messagesEndRefInternal = useRef(messagesEndRef);

  activeConvRef.current = activeConv;
  getPeerIdRef.current = getPeerId;
  messagesEndRefInternal.current = messagesEndRef;

  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 1. Establish persistent Socket.io connection on mount
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "http://localhost:3002";

    const socket = io(backendUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 10000,
      timeout: 10000,
    });
    socketRef.current = socket;

    socket.on("connect_error", () => {
      setIsOnline(false);
      setIsTyping(false);
    });

    socket.on("disconnect", () => {
      setIsOnline(false);
      setIsTyping(false);
    });

    socket.on("connect", () => {
      const currentConv = activeConvRef.current;
      if (currentConv) {
        socket.emit("join:conversation", currentConv.id);
        const peerId = getPeerIdRef.current(currentConv);
        if (peerId) {
          socket.emit("presence:query", peerId);
        }
      }
    });

    socket.on("message:new", (message: Message) => {
      const currentConv = activeConvRef.current;
      if (currentConv && message.conversationId === currentConv.id) {
        queryClient.setQueryData<Message[]>(["messagesThread", currentConv.id], (old = []) => {
          if (old.some((m) => m.id === message.id)) return old;
          return [...old, message];
        });
        setTimeout(() => {
          messagesEndRefInternal.current.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      queryClient.invalidateQueries({ queryKey: ["conversationsList"] });
    });

    socket.on("messages:read", ({ conversationId }: { conversationId: string }) => {
      const currentConv = activeConvRef.current;
      if (currentConv && conversationId === currentConv.id) {
        queryClient.setQueryData<Message[]>(["messagesThread", currentConv.id], (old = []) =>
          old.map((m) => ({ ...m, status: "read" as const })),
        );
      }
    });

    socket.on("conversations:refresh", () => {
      queryClient.invalidateQueries({ queryKey: ["conversationsList"] });
    });

    socket.on("status:update", ({ userId, status }: { userId: string; status: string }) => {
      const currentConv = activeConvRef.current;
      const peerId = currentConv ? getPeerIdRef.current(currentConv) : null;
      if (peerId && peerId === userId) {
        setIsOnline(status === "online");
      }
    });

    socket.on("presence:res", ({ userId, isOnline: online }: { userId: string; isOnline: boolean }) => {
      const currentConv = activeConvRef.current;
      const peerId = currentConv ? getPeerIdRef.current(currentConv) : null;
      if (peerId && peerId === userId) {
        setIsOnline(online);
      }
    });

    socket.on("user:typing", ({ userId, isTyping: typing }: { userId: string; isTyping: boolean }) => {
      const currentConv = activeConvRef.current;
      const peerId = currentConv ? getPeerIdRef.current(currentConv) : null;
      if (peerId && peerId === userId) {
        setIsTyping(typing);
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [queryClient]);

  // 2. Join/leave conversation rooms and query presence when active conversation changes
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !activeConv) {
      setIsOnline(false);
      setIsTyping(false);
      return;
    }

    setIsTyping(false);
    setIsOnline(false);
    socket.emit("join:conversation", activeConv.id);
    const peerId = getPeerId(activeConv);
    if (peerId) {
      socket.emit("presence:query", peerId);
    }

    return () => {
      socket.emit("leave:conversation", activeConv.id);
    };
  }, [activeConv?.id, getPeerId]);

  const emitTyping = (typing: boolean) => {
    if (socketRef.current && activeConv) {
      socketRef.current.emit("typing", { conversationId: activeConv.id, isTyping: typing });
    }
  };

  return { isOnline, isTyping, isUploading, setIsUploading, emitTyping };
}
