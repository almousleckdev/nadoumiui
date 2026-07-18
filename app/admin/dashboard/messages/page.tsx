"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getConversations, getMessages, sendMessage, uploadMessageFile } from "@/services/messageService";
import Card from "@/components/ui/Card";
import type { Conversation, Message } from "@/types";
import { File, MessageSquare } from "lucide-react";
import { useConversationSocket } from "@/features/messages/hooks/useConversationSocket";
import { MessageBubble } from "@/features/messages/components/MessageBubble";
import { ChatInputBar } from "@/features/messages/components/ChatInputBar";
import { CHAT_FILE_ACCEPT } from "@/features/messages/constants";

function ChatWorkspace() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const selectConvId = searchParams.get("select");

  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: conversations = [], isLoading: isConvLoading } = useQuery({
    queryKey: ["conversationsList"],
    queryFn: getConversations,
  });

  const { data: messages = [], isLoading: isMessagesLoading } = useQuery({
    queryKey: ["messagesThread", activeConv?.id],
    queryFn: () => (activeConv ? getMessages(activeConv.id) : Promise.resolve([])),
    enabled: Boolean(activeConv),
  });

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
      queryClient.setQueryData<Message[]>(["messagesThread", activeConv?.id], (old = []) => {
        if (old.some((m) => m.id === newMessage.id)) return old;
        return [...old, newMessage];
      });
      setInputText("");
      queryClient.invalidateQueries({ queryKey: ["conversationsList"] });
    },
  });

  const { isOnline, isTyping, isUploading, setIsUploading, emitTyping } = useConversationSocket({
    activeConv,
    getPeerId: (conv) => conv.studentId,
    messagesEndRef,
  });

  // Auto-select conversation based on search parameter
  useEffect(() => {
    if (selectConvId && conversations.length > 0) {
      const match = conversations.find((c) => c.id === selectConvId);
      if (match) {
        setActiveConv(match);
      }
    }
  }, [selectConvId, conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMutation.mutate({ conversationId: activeConv.id, content: inputText.trim(), type: "text" });
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    emitTyping(e.target.value.length > 0);
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
        fileInfo: { url: res.url, name: res.name, size: res.size },
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
            <div className="text-center py-12 text-gray-400 text-xs">No inquiries received yet.</div>
          ) : (
            conversations.map((conv) => {
              const isSelected = activeConv?.id === conv.id;
              const initials = conv.student ? `${conv.student.firstName[0]}${conv.student.lastName[0]}` : "ST";

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
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs shrink-0 relative">
                  {activeConv.student?.firstName?.[0] || "S"}
                  {activeConv.student?.lastName?.[0] || "T"}
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-slate-950 ${
                      isOnline ? "bg-emerald-500" : "bg-gray-550"
                    }`}
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-bold text-gray-900 block truncate">
                    {activeConv.student?.firstName} {activeConv.student?.lastName}
                  </span>
                  <span className="text-[10px] text-gray-400 block truncate">
                    {isOnline ? "Online" : "Offline"} {isTyping && " | typing..."} | Student ID: {activeConv.studentId}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/40">
              {isMessagesLoading ? (
                <div className="text-center py-12 text-gray-400 text-xs">Loading chat messages...</div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  No messages in this chat. Type below to send a message.
                </div>
              ) : (
                messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isOwnMessage={msg.senderRole.toLowerCase() === "admin"}
                    fileIcon={File}
                    checkIconClassName="w-3 h-3"
                    checkIconStrokeWidth={3}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <ChatInputBar
              variant="admin"
              inputText={inputText}
              onInputChange={handleTyping}
              onSend={handleSend}
              onFileSelected={handleFileUpload}
              isUploading={isUploading}
              isSending={sendMutation.isPending}
              fileInputRef={fileInputRef}
              fileAccept={CHAT_FILE_ACCEPT}
            />
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
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">Student Inquiries</h1>
        <p className="text-gray-500 text-sm mt-1">
          Chat directly with applicants and help resolve documentation blockers.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading chat workspace...</div>}>
        <ChatWorkspace />
      </Suspense>
    </div>
  );
}
