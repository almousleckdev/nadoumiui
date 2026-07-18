"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import {
  getConversations,
  getMessages,
  sendMessage,
  getSupportAdmins,
  createConversation,
  uploadMessageFile,
} from "@/services/messageService";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Check, CheckCheck, Paperclip, Download, FileText, MessageSquare } from "lucide-react";
import type { Conversation, Message, Admin } from "@/types";
import { resolveDocumentUrl } from "@/utils/resolveUrl";

function StudentChatWorkspace() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectAdminId = searchParams.get("adminId");

  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState<boolean>(false);
  const [typingStatus, setTypingStatus] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // 1. Fetch Student Conversations
  const { data: conversations = [], isLoading: isConvLoading } = useQuery({
    queryKey: ["conversationsList"],
    queryFn: getConversations,
  });

  // 2. Fetch Support Admins (only needed to start a new chat)
  const { data: supportAdmins = [] } = useQuery({
    queryKey: ["supportAdmins"],
    queryFn: getSupportAdmins,
  });

  // 3. Fetch Messages for active thread
  const { data: messages = [], isLoading: isMessagesLoading } = useQuery({
    queryKey: ["messagesThread", activeConv?.id],
    queryFn: () => (activeConv ? getMessages(activeConv.id) : Promise.resolve([])),
    enabled: Boolean(activeConv),
  });

  // 4. Send Message Mutation
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

  // 5. Create Conversation Mutation
  const createConvMutation = useMutation({
    mutationFn: createConversation,
    onSuccess: (newConv) => {
      queryClient.invalidateQueries({ queryKey: ["conversationsList"] });
      setActiveConv(newConv);
      router.replace("/dashboard/messages");
    },
  });

  // Handle Socket.io connections
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "http://localhost:3002";
    
    // Connect to WebSocket Server
    const socket = io(backendUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[SOCKET] Connected to WebSocket");
      if (activeConv?.adminId) {
        socket.emit("presence:query", activeConv.adminId);
      }
    });

    socket.on("message:new", (message: Message) => {
      console.log("[SOCKET] New message received:", message);
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
      if (activeConv && activeConv.adminId === userId) {
        setOnlineStatus(status === "online");
      }
    });

    socket.on("presence:res", ({ userId, isOnline }) => {
      if (activeConv && activeConv.adminId === userId) {
        setOnlineStatus(isOnline);
      }
    });

    socket.on("user:typing", ({ userId, isTyping }) => {
      if (activeConv && activeConv.adminId === userId) {
        setTypingStatus(isTyping);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [activeConv, queryClient]);

  // Handle active conversation switching & Room joining
  useEffect(() => {
    if (!socketRef.current || !activeConv) return;
    
    // Join conversation room
    socketRef.current.emit("join:conversation", activeConv.id);
    // Query presence
    if (activeConv.adminId) {
      socketRef.current.emit("presence:query", activeConv.adminId);
    }

    return () => {
      if (socketRef.current && activeConv) {
        socketRef.current.emit("leave:conversation", activeConv.id);
      }
    };
  }, [activeConv]);

  // Auto-select conversation based on query parameters (e.g. initiating chat from list)
  useEffect(() => {
    if (selectAdminId && supportAdmins.length > 0) {
      // Find if we already have a conversation with this admin
      const existing = conversations.find((c) => c.adminId === selectAdminId);
      if (existing) {
        const t = setTimeout(() => {
          setActiveConv(existing);
          router.replace("/dashboard/messages");
        }, 0);
        return () => clearTimeout(t);
      } else {
        // Create new conversation
        createConvMutation.mutate(selectAdminId);
      }
    } else if (conversations.length > 0 && !activeConv) {
      // Default to first conversation
      const t = setTimeout(() => setActiveConv(conversations[0]), 0);
      return () => clearTimeout(t);
    }
  }, [selectAdminId, conversations, supportAdmins, activeConv, router]);

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
      
      // Determine content text based on type
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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[650px]">
      {/* Left Column: List of conversations / available admins */}
      <Card className="md:col-span-4 p-0 overflow-hidden border border-gray-200 bg-white flex flex-col h-full">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Conversations</h2>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {isConvLoading ? (
            <div className="text-center py-12 text-gray-400 text-xs animate-pulse">
              Loading your messages...
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-4 space-y-4">
              <p className="text-xs text-gray-500 text-center">
                You don&apos;t have any support conversations yet. Select an available administrator below to start a chat.
              </p>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Available Admins</span>
                {supportAdmins.map((admin: Admin) => (
                  <button
                    key={admin.id}
                    onClick={() => createConvMutation.mutate(admin.id)}
                    className="w-full text-left p-3 border border-gray-100 rounded-xl hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                      {admin.name[0]}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">{admin.name}</span>
                      <span className="text-[10px] text-gray-500 block">Support Representative</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            conversations.map((conv) => {
              const isSelected = activeConv?.id === conv.id;
              const initials = conv.admin
                ? `${conv.admin.name[0]}`
                : "AD";

              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConv(conv)}
                  className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${
                    isSelected ? "bg-orange-50/50 border-l-4 border-orange-600" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-800 block truncate">
                        {conv.admin?.name || "Support Administrator"}
                      </span>
                      {conv.unreadCountStudent > 0 && (
                        <span className="bg-orange-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                          {conv.unreadCountStudent}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 block truncate mt-0.5">
                      {conv.lastMessage || "Click to start chatting..."}
                    </span>
                  </div>
                </button>
              )
            })
          )}
        </div>
      </Card>

      {/* Right Column: Chat Workspace */}
      <Card className="md:col-span-8 p-0 overflow-hidden border border-gray-200 bg-white flex flex-col h-full">
        {activeConv ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shrink-0 relative">
                  {activeConv.admin?.name?.[0] || "A"}
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      onlineStatus ? "bg-emerald-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-bold text-gray-800 block truncate">
                    {activeConv.admin?.name || "Support Administrator"}
                  </span>
                  <span className="text-[10px] text-gray-500 block truncate">
                    {onlineStatus ? "Online" : "Offline"} {typingStatus && " | typing..."}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {isMessagesLoading ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  Loading chat history...
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  No messages in this chat. Type below to ask a question.
                </div>
              ) : (
                messages.map((msg) => {
                  const isStudentSender = msg.senderRole.toLowerCase() === "student";
                  
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isStudentSender ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                          isStudentSender
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
                          <div className="mb-2 rounded-lg p-2.5 bg-black/10 border border-white/10 flex items-center gap-2.5">
                            <FileText className="w-5 h-5 text-white shrink-0" />
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
                              <Download className="w-4 h-4" />
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
                          {isStudentSender && (
                            <span className="text-white shrink-0">
                              {msg.status === "read" ? (
                                <CheckCheck className="w-4 h-4 text-cyan-200" />
                              ) : (
                                <Check className="w-4 h-4 text-white/85" />
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

            {/* Input Bar */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <form onSubmit={handleSend} className="flex gap-2 items-center">
                <input
                  type="file"
                  id="chat-file-upload"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                />
                
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-colors focus-ring disabled:opacity-50"
                  title="Upload picture or file"
                >
                  {isUploading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-500 border-t-transparent animate-spin" />
                  ) : (
                    <Paperclip className="w-5 h-5" />
                  )}
                </button>

                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputText}
                  onChange={handleTyping}
                  className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />

                <Button type="submit" variant="primary" isLoading={sendMutation.isPending}>
                  Send
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm p-8 text-center bg-gray-50/20">
            <MessageSquare className="w-12 h-12 text-gray-300 mb-4" />
            Select a support conversation on the left, or initiate one with an administrator.
          </div>
        )}
      </Card>
    </div>
  );
}

export default function StudentMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">
          Support Inbox
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Resolve application issues, confirm documents, or chat with四川纳豆米 representatives.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading support chat workspace...</div>}>
        <StudentChatWorkspace />
      </Suspense>
    </div>
  );
}
