"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import {
  getConversations,
  getMessages,
  sendMessage,
  uploadMessageFile,
} from "@/services/messageService";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { Conversation, Message } from "@/types";
import { resolveDocumentUrl } from "@/utils/resolveUrl";
import { File, Download, CheckCheck, Check, Paperclip, MessageSquare } from "lucide-react";

function ChatWorkspace() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const selectConvId = searchParams.get("select");

  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState<boolean>(false);
  const [typingStatus, setTypingStatus] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // 1. Fetch Conversations
  const { data: conversations = [], isLoading: isConvLoading } = useQuery({
    queryKey: ["conversationsList"],
    queryFn: getConversations,
  });

  // 2. Fetch Messages for active thread
  const { data: messages = [], isLoading: isMessagesLoading } = useQuery({
    queryKey: ["messagesThread", activeConv?.id],
    queryFn: () => (activeConv ? getMessages(activeConv.id) : Promise.resolve([])),
    enabled: Boolean(activeConv),
  });

  // 3. Send Message Mutation
  const sendMutation = useMutation({
    mutationFn: ({
      conversationId,
      content,
      type,
      fileInfo,
    }: {
      conversationId: string;
      content: string;
      type?: "text" | "image" | "file";
      fileInfo?: { url: string; name: string; size: string };
    }) => sendMessage(conversationId, content, type, fileInfo),
    onSuccess: (newMessage) => {
      queryClient.setQueryData<Message[]>(
        ["messagesThread", activeConv?.id],
        (old = []) => {
          if (old.some((m) => m.id === newMessage.id)) return old;
          return [...old, newMessage];
        }
      );
      setInputText("");
      queryClient.invalidateQueries({ queryKey: ["conversationsList"] });
    },
  });

  // Establish Socket.io connection for Admin
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "http://localhost:3002";
    const socket = io(backendUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[SOCKET ADMIN] Connected");
      if (activeConv?.studentId) {
        socket.emit("presence:query", activeConv.studentId);
      }
    });

    socket.on("message:new", (message: Message) => {
      console.log("[SOCKET ADMIN] New message:", message);
      if (activeConv && message.conversationId === activeConv.id) {
        queryClient.setQueryData<Message[]>(
          ["messagesThread", activeConv.id],
          (old = []) => {
            if (old.some((m) => m.id === message.id)) return old;
            return [...old, message];
          }
        );
        // Force scroll update
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      queryClient.invalidateQueries({ queryKey: ["conversationsList"] });
    });

    socket.on("messages:read", ({ conversationId }) => {
      if (activeConv && conversationId === activeConv.id) {
        queryClient.setQueryData<Message[]>(
          ["messagesThread", activeConv.id],
          (old = []) => old.map((m) => ({ ...m, status: "read" as const }))
        );
      }
    });

    socket.on("conversations:refresh", () => {
      queryClient.invalidateQueries({ queryKey: ["conversationsList"] });
    });

    socket.on("status:update", ({ userId, status }) => {
      if (activeConv && activeConv.studentId === userId) {
        setOnlineStatus(status === "online");
      }
    });

    socket.on("presence:res", ({ userId, isOnline }) => {
      if (activeConv && activeConv.studentId === userId) {
        setOnlineStatus(isOnline);
      }
    });

    socket.on("user:typing", ({ userId, isTyping }) => {
      if (activeConv && activeConv.studentId === userId) {
        setTypingStatus(isTyping);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [activeConv, queryClient]);

  // Join Room when changing active thread
  useEffect(() => {
    if (!socketRef.current || !activeConv) return;

    socketRef.current.emit("join:conversation", activeConv.id);
    if (activeConv.studentId) {
      socketRef.current.emit("presence:query", activeConv.studentId);
    }

    return () => {
      if (socketRef.current && activeConv) {
        socketRef.current.emit("leave:conversation", activeConv.id);
      }
    };
  }, [activeConv]);

  // Auto-select conversation based on search parameter
  useEffect(() => {
    if (selectConvId && conversations.length > 0) {
      const match = conversations.find((c) => c.id === selectConvId);
      if (match) {
        setActiveConv(match);
      }
    }
  }, [selectConvId, conversations]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMutation.mutate({
      conversationId: activeConv.id,
      content: inputText.trim(),
      type: "text",
    });
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (socketRef.current && activeConv) {
      socketRef.current.emit("typing", {
        conversationId: activeConv.id,
        isTyping: e.target.value.length > 0,
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeConv) return;

    try {
      setIsUploading(true);
      const res = await uploadMessageFile(activeConv.id, file);

      const contentText = res.type === "image" ? `Sent an image: ${res.name}` : `Sent a file: ${res.name}`;

      sendMutation.mutate({
        conversationId: activeConv.id,
        content: contentText,
        type: res.type,
        fileInfo: {
          url: res.url,
          name: res.name,
          size: res.size,
        },
      });
    } catch (err) {
      console.error("Failed to upload file:", err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px]">
      {/* Left Side: Conversations List */}
      <Card className="md:col-span-4 p-0 overflow-hidden border border-gray-200 bg-white flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Conversations</h2>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
          {isConvLoading ? (
            <div className="text-center py-12 text-gray-400 text-xs animate-pulse">
              Loading support conversations...
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs">
              No inquiries received yet.
            </div>
          ) : (
            conversations.map((conv) => {
              const isSelected = activeConv?.id === conv.id;
              const initials = conv.student
                ? `${conv.student.firstName[0]}${conv.student.lastName[0]}`
                : "ST";

              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConv(conv)}
                  className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${
                    isSelected ? "bg-gray-100" : "hover:bg-gray-100/50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 text-gray-700 flex items-center justify-center font-bold text-sm shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900 block truncate">
                        {conv.student?.firstName} {conv.student?.lastName}
                      </span>
                      {conv.unreadCountAdmin > 0 && (
                        <span className="bg-orange-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                          {conv.unreadCountAdmin}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 block truncate mt-0.5">
                      {conv.lastMessage || "Click to start chatting..."}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </Card>

      {/* Right Side: Conversation Thread */}
      <Card className="md:col-span-8 p-0 overflow-hidden border border-gray-200 bg-white flex flex-col h-full">
        {activeConv ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs shrink-0 relative">
                  {activeConv.student?.firstName?.[0] || "S"}
                  {activeConv.student?.lastName?.[0] || "T"}
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-slate-950 ${
                      onlineStatus ? "bg-emerald-500" : "bg-gray-550"
                    }`}
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-bold text-gray-900 block truncate">
                    {activeConv.student?.firstName} {activeConv.student?.lastName}
                  </span>
                  <span className="text-[10px] text-gray-400 block truncate">
                    {onlineStatus ? "Online" : "Offline"} {typingStatus && " | typing..."} | Student ID: {activeConv.studentId}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/40">
              {isMessagesLoading ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  Loading chat messages...
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  No messages in this chat. Type below to send a message.
                </div>
              ) : (
                messages.map((msg) => {
                  const isAdmin = msg.senderRole.toLowerCase() === "admin";
                  
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                          isAdmin
                            ? "bg-green-600 text-white rounded-tr-none"
                            : "bg-amber-500 text-white rounded-tl-none"
                        }`}
                      >
                        {/* Render File/Image Attachment */}
                        {msg.type === "image" && msg.fileUrl && (
                          <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
                            <a href={resolveDocumentUrl(msg.fileUrl)} target="_blank" rel="noopener noreferrer">
                              <Image
                                src={resolveDocumentUrl(msg.fileUrl)}
                                alt={msg.fileName || "Uploaded Image"}
                                width={300}
                                height={200}
                                unoptimized
                                className="max-w-full max-h-48 object-cover hover:scale-105 transition-transform duration-250 cursor-zoom-in rounded-lg"
                              />
                            </a>
                          </div>
                        )}

                        {msg.type === "file" && msg.fileUrl && (
                          <div className="mb-2 rounded-lg p-2.5 bg-black/15 border border-white/10 flex items-center gap-2.5">
                            <File className="w-5 h-5 text-white shrink-0" strokeWidth={2} />
                            <div className="min-w-0 flex-1">
                              <span className="text-xs font-semibold block truncate text-white">{msg.fileName}</span>
                              <span className="text-[10px] block opacity-75 text-white">{msg.fileSize}</span>
                            </div>
                            <a
                              href={resolveDocumentUrl(msg.fileUrl)}
                              download={msg.fileName}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-1.5 transition-colors"
                            >
                              <Download className="w-4 h-4" strokeWidth={2} />
                            </a>
                          </div>
                        )}

                        <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>

                        <div className="flex items-center justify-end gap-1.5 mt-1 opacity-75">
                          <span className="text-[9px] text-white">
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {isAdmin && (
                            <span className="text-white shrink-0">
                              {msg.status === "read" ? (
                                <CheckCheck className="w-3 h-3 text-cyan-200" strokeWidth={3} />
                              ) : (
                                <Check className="w-3 h-3 text-white/85" strokeWidth={3} />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <form onSubmit={handleSend} className="flex gap-2 items-center">
                <input
                  type="file"
                  id="admin-chat-file-upload"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                />

                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 bg-white text-gray-500 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors focus-ring disabled:opacity-50"
                  title="Upload picture or file"
                >
                  {isUploading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
                  ) : (
                    <Paperclip className="w-5 h-5" strokeWidth={2} />
                  )}
                </button>

                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={handleTyping}
                  className="flex-1 bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />

                <Button type="submit" variant="primary" isLoading={sendMutation.isPending}>
                  Send
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm">
            <MessageSquare className="w-12 h-12 text-slate-700 mb-4" strokeWidth={1.5} />
            Select a conversation to start chatting
          </div>
        )}
      </Card>
    </div>
  );
}

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">
          Student Inquiries
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Chat directly with applicants and help resolve documentation blockers.
        </p>
      </div>

      {/* Chat Workspace Wrapped in Suspense because of useSearchParams */}
      <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading chat workspace...</div>}>
        <ChatWorkspace />
      </Suspense>
    </div>
  );
}
