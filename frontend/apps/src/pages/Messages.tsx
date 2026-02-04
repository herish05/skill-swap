import { useState } from "react";
import { Search, Send, Paperclip, Video, Calendar, MoreVertical, Phone, Smile } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { GradientInput } from "@/components/ui/gradient-input";
import { GradientButton } from "@/components/ui/gradient-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const conversations = [
  { id: 1, name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", lastMessage: "Sure, let's schedule for tomorrow!", time: "2m ago", unread: 2, online: true },
  { id: 2, name: "Michael Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael", lastMessage: "The design looks great!", time: "1h ago", unread: 0, online: true },
  { id: 3, name: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", lastMessage: "Thanks for the session!", time: "3h ago", unread: 0, online: false },
  { id: 4, name: "David Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", lastMessage: "I'll send the files later", time: "1d ago", unread: 0, online: false },
  { id: 5, name: "Lisa Anderson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa", lastMessage: "Can we reschedule?", time: "2d ago", unread: 1, online: true },
];

const messages = [
  { id: 1, sender: "them", text: "Hey! I saw your profile and I'm interested in learning React from you!", time: "10:30 AM" },
  { id: 2, sender: "me", text: "Hi Sarah! That sounds great. I'd love to help you with React. What's your current experience level?", time: "10:32 AM" },
  { id: 3, sender: "them", text: "I know the basics of JavaScript but I'm new to React. I can teach you UI/UX design in exchange!", time: "10:35 AM" },
  { id: 4, sender: "me", text: "Perfect! I've been wanting to learn more about UI/UX. Shall we schedule a video call to discuss the details?", time: "10:38 AM" },
  { id: 5, sender: "them", text: "Sure, let's schedule for tomorrow!", time: "10:40 AM" },
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Send:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-7rem)] bg-card rounded-2xl border border-border shadow-card overflow-hidden animate-fade-in">
        <div className="flex h-full">
          {/* Conversations list */}
          <div className={cn(
            "w-full md:w-80 border-r border-border flex flex-col",
            !showChatList && "hidden md:flex"
          )}>
            {/* Search */}
            <div className="p-4 border-b border-border">
              <GradientInput
                placeholder="Search conversations..."
                icon={<Search size={18} />}
                className="h-10"
              />
            </div>

            {/* Conversation list */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => {
                      setSelectedChat(conv);
                      setShowChatList(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                      selectedChat.id === conv.id
                        ? "bg-primary/10"
                        : "hover:bg-secondary"
                    )}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conv.avatar} />
                        <AvatarFallback>{conv.name[0]}</AvatarFallback>
                      </Avatar>
                      {conv.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conv.name}</p>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 rounded-full gradient-bg text-primary-foreground text-xs flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat window */}
          <div className={cn(
            "flex-1 flex flex-col",
            showChatList && "hidden md:flex"
          )}>
            {/* Chat header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowChatList(true)}
                  className="md:hidden p-2 hover:bg-secondary rounded-lg"
                >
                  ←
                </button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedChat.avatar} />
                  <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedChat.name}</p>
                  <p className="text-xs text-success">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <GradientButton variant="ghost" size="icon">
                  <Phone size={18} />
                </GradientButton>
                <GradientButton variant="ghost" size="icon">
                  <Video size={18} />
                </GradientButton>
                <GradientButton variant="ghost" size="icon">
                  <Calendar size={18} />
                </GradientButton>
                <GradientButton variant="ghost" size="icon">
                  <MoreVertical size={18} />
                </GradientButton>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-2xl px-4 py-3",
                        msg.sender === "me"
                          ? "gradient-bg text-primary-foreground rounded-br-md"
                          : "bg-secondary rounded-bl-md"
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={cn(
                        "text-xs mt-1",
                        msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <GradientButton variant="ghost" size="icon">
                  <Paperclip size={18} />
                </GradientButton>
                <GradientButton variant="ghost" size="icon">
                  <Smile size={18} />
                </GradientButton>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 h-11 px-4 rounded-xl bg-secondary border-0 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <GradientButton size="icon" onClick={handleSendMessage}>
                  <Send size={18} />
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
