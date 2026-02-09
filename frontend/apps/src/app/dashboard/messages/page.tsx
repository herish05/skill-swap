"use client";
import { useEffect, useState } from "react";
import {
  Search,
  Send,
  Paperclip,
  Video,
  Calendar,
  MoreVertical,
  Phone,
  Smile,
} from "lucide-react";

import DashboardLayout from "@/components/DashboardLayout";
import { GradientInput } from "@/components/ui/gradient-input";
import { GradientButton } from "@/components/ui/gradient-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ProtectedRoute from "@/components/ProtectedRoutes";

import { useChatSocket } from "@/hooks/UseChatSocket";
import {getAllSwapsData } from "@/app/lib/swap.api";
import { getProfile } from "@/app/lib/profile.api";
import { getUserFromToken } from "@/app/lib/auth";
import { authFetch } from "@/app/lib/authFetch";

export default function Messages() {
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);

  // ✅ GET USER ONCE
  useEffect(() => {
    const u = getUserFromToken();
    if (u) setUser(u);
  }, []);

  const socketRef = useChatSocket(user?.authUserId);

  // ✅ LOAD CONVERSATIONS AFTER USER
  
  useEffect(() => {
    if (!user) return;
    const loadChats = async () => {
      try {
        const swaps = await getAllSwapsData(user.authUserId);
        const accepted = swaps.filter((s: any) => s.status === "ACCEPTED");
        const convos = accepted.map((swap: any) => ({
          id: swap.id,
          swapId: swap.id,
          otherUserId: swap.otherUser.profile.authUserId,
          name: swap.otherUser.profile.fullName,
          avatar: swap.otherUser.profile.avatar,
          subtitle: `${swap.offeredSkill.skillName} ↔ ${swap.wantedSkill.skillName}`,
          online:false,
          lastMessage:"",
          unread:0,
        }));

        setConversations(convos);
        if (convos.length > 0) setSelectedChat(convos[0]);
      } catch (err) {
        console.error("Chat load error", err);
      }
    };

    loadChats();
  }, [user]);

  // ✅ JOIN ROOM + REALTIME LISTENER
  useEffect(() => {
    if (!selectedChat || !socketRef.current) return;
    const socket = socketRef.current;
    socket.emit("joinRoom", selectedChat.swapId);

    const handleMessage = (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [selectedChat]);

  useEffect(() => {
    if (!selectedChat) return;

    const loadMessages = async () => {
      try {
        const data = await authFetch(
          `http://localhost:4007/chats/${selectedChat.swapId}/messages`,
        );
        // const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Message load error", err);
      }
    };

    loadMessages();
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      swapId: selectedChat.swapId,
      senderId: user.authUserId,
      receiverId:selectedChat.otherUserId,
      message: newMessage,
    });

    setNewMessage("");
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="h-[calc(100vh-7rem)] bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="flex h-full">
            {/* LEFT CHAT LIST */}
            <div
              className={cn(
                "w-full md:w-80 border-r flex flex-col",
                !showChatList && "hidden md:flex",
              )}
            >
              <div className="p-4 border-b">
                <GradientInput
                  placeholder="Search..."
                  icon={<Search size={18} />}
                />
              </div>

              <ScrollArea className="flex-1">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => {
                      setSelectedChat(conv);
                      setShowChatList(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-secondary"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conv.avatar} />
                      <AvatarFallback>{conv.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium truncate">{conv.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {conv.subtitle}
                    </p>
                  </button>
                ))}
              </ScrollArea>
            </div>

            {/* CHAT WINDOW */}
            <div
              className={cn(
                "flex-1 flex flex-col",
                showChatList && "hidden md:flex",
              )}
            >
              {selectedChat && (
                <>
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedChat.avatar} />
                        <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{selectedChat.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedChat.subtitle}
                      </p>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 p-4">
                    {messages.map((msg) => {
                      const isMe = msg.senderId === user?.authUserId;
                      return (
                        <div
                          key={msg._id}
                          className={cn(
                            "flex",
                            isMe ? "justify-end" : "justify-start",
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[70%] px-4 py-2 rounded-xl",
                              isMe ? "bg-primary text-white" : "bg-secondary",
                            )}
                          >
                            <p>{msg.message}</p>
                            <p className="text-xs opacity-60 mt-1">
                              {new Date(msg.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </ScrollArea>

                  <div className="p-4 border-t flex gap-3">
                    <input
                      className="flex-1 h-11 px-4 rounded-xl bg-secondary"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Type message..."
                    />
                    <GradientButton size="icon" onClick={handleSendMessage}>
                      <Send size={18} />
                    </GradientButton>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
