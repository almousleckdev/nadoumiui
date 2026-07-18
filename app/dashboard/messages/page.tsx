"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getConversations,
  getMessages,
  sendMessage,
  getSupportAdmins,
  createConversation,
  uploadMessageFile,
} from "@/services/messageService";
import Card from "@/components/ui/Card";
import { FileText, MessageSquare } from "lucide-react";
import type { Conversation, Message, Admin } from "@/types";
import { useConversationSocket } from "@/features/messages/hooks/useConversationSocket";
import { MessageBubble } from "@/features/messages/components/MessageBubble";
import { ChatInputBar } from "@/features/messages/components/ChatInputBar";
import { CHAT_FILE_ACCEPT } from "@/features/messages/constants";

function StudentChatWorkspace() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectAdminId = searchParams.get("adminId");

  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: conversations = [], isLoading: isConvLoading } = useQuery({
    queryKey: ["conversationsList"],
    queryFn: getConversations,
  });

  const { data: supportAdmins = [] } = useQuery({
    queryKey: ["supportAdmins"],
    queryFn: getSupportAdmins,
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

  const createConvMutation = useMutation({
    mutationFn: createConversation,
    onSuccess: (newConv) => {
      queryClient.invalidateQueries({ queryKey: ["conversationsList"] });
      setActiveConv(newConv);
      router.replace("/dashboard/messages");
    },
  });

  const { isOnline, isTyping, isUploading, setIsUploading, emitTyping } = useConversationSocket({
    activeConv,
    getPeerId: (conv) => conv.adminId,
    messagesEndRef,
  });

  // Auto-select conversation based on query parameters (e.g. initiating chat from list)
  useEffect(() => {
    if (selectAdminId && supportAdmins.length > 0) {
      const existing = conversations.find((c) => c.adminId === selectAdminId);
      if (existing) {
        const t = setTimeout(() => {
          setActiveConv(existing);
          router.replace("/dashboard/messages");
        }, 0);
        return () => clearTimeout(t);
      } else {
        createConvMutation.mutate(selectAdminId);
      }
    } else if (conversations.length > 0 && !activeConv) {
      const t = setTimeout(() => setActiveConv(conversations[0]), 0);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAdminId, conversations, supportAdmins, activeConv, router]);

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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[650px]">
      {/* Left Column: List of conversations / available admins */}
      <Card className="md:col-span-4 p-0 overflow-hidden border border-gray-200 bg-white flex flex-col h-full">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Conversations</h2>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {isConvLoading ? (
            <div className="text-center py-12 text-gray-400 text-xs animate-pulse">Loading your messages...</div>
          ) : conversations.length === 0 ? (
            <div className="p-4 space-y-4">
              <p className="text-xs text-gray-500 text-center">
                You don&apos;t have any support conversations yet. Select an available administrator below to start a
                chat.
              </p>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Available Admins
                </span>
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
              const initials = conv.admin ? `${conv.admin.name[0]}` : "AD";

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
              );
            })
          )}
        </div>
      </Card>

      {/* Right Column: Chat Workspace */}
      <Card className="md:col-span-8 p-0 overflow-hidden border border-gray-200 bg-white flex flex-col h-full">
        {activeConv ? (
          <>
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shrink-0 relative">
                  {activeConv.admin?.name?.[0] || "A"}
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      isOnline ? "bg-emerald-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-bold text-gray-800 block truncate">
                    {activeConv.admin?.name || "Support Administrator"}
                  </span>
                  <span className="text-[10px] text-gray-500 block truncate">
                    {isOnline ? "Online" : "Offline"} {isTyping && " | typing..."}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {isMessagesLoading ? (
                <div className="text-center py-12 text-gray-400 text-xs">Loading chat history...</div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  No messages in this chat. Type below to ask a question.
                </div>
              ) : (
                messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isOwnMessage={msg.senderRole.toLowerCase() === "student"}
                    fileIcon={FileText}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <ChatInputBar
              variant="student"
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
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">Support Inbox</h1>
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
