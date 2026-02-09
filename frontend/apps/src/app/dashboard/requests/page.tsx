"use client";
import { useEffect, useState } from "react";
import { Check, X, Clock, User, MessageSquare, Video } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { getUserFromToken } from "@/app/lib/auth";
import {  getAllSwapsData, updateSwapStatus } from "@/app/lib/swap.api";
import { toast } from "sonner";
const requests = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 4.9,
      reviews: 28,
    },
    skillWanted: "React Development",
    skillOffered: "UI/UX Design",
    message:
      "I'd love to learn React from you! I can teach you UI/UX design in return.",
    status: "pending",
    date: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Michael Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 4.7,
      reviews: 15,
    },
    skillWanted: "Graphic Design",
    skillOffered: "Python",
    message: "Your Python skills are impressive. Can we arrange a session?",
    status: "pending",
    date: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      rating: 4.8,
      reviews: 42,
    },
    skillWanted: "Video Editing",
    skillOffered: "Photography",
    message:
      "Great! I've accepted your request. Let's schedule our first session.",
    status: "accepted",
    date: "1 day ago",
  },
  {
    id: 4,
    user: {
      name: "David Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      rating: 4.6,
      reviews: 19,
    },
    skillWanted: "Data Science",
    skillOffered: "JavaScript",
    message:
      "Unfortunately, I don't have time right now. Thanks for understanding!",
    status: "declined",
    date: "3 days ago",
  },
];

function getStatusColor(status: any) {
  if (status === "pending") return "bg-warning/10 text-warning";
  if (status === "accepted") return "bg-success/10 text-success";
  if (status === "declined") return "bg-destructive/10 text-destructive";
}
function getStatusIcon(status: any) {
  if (status === "pending") return <Clock size={16} />;
  if (status === "accepted") return <Check size={16} />;
  if (status === "declined") return <X size={16} />;
}
const timeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.floor(hours / 24)} days ago`;
};
function RequestCard({ request, currentUserId, onAction }: any) {
  const isRequester = request.requesterUserId === currentUserId;
  const isPending = request.status === "pending";

  return (
    <Card className="p-4 hover:shadow-lg transition-all border border-border">
      <div className="flex gap-4">
        <Avatar className="h-14 w-14 flex-shrink-0">
          <AvatarImage src={request.user.avatar} />
          <AvatarFallback>{request.user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-semibold">{request.user.name}</h3>⭐{" "}
              {request.user.rating} • {request.user.reviews} reviews
            </div>

            <Badge className={`${getStatusColor(request.status)} flex gap-1`}>
              {getStatusIcon(request.status)}
              {request.status}
            </Badge>
          </div>

          <div className="text-sm mb-2">
            Wants: <b>{request.skillWanted}</b> ↔ Offers:{" "}
            <b>{request.skillOffered}</b>
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            {request.message}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {request.date}
            </span>

            {isPending && (
              <div className="flex gap-2">
                {/* Receiver controls */}
                {!isRequester && (
                  <>
                    <GradientButton
                      size="sm"
                      onClick={() => onAction(request.id, "ACCEPTED")}
                    >
                      <Check size={16} /> Accept
                    </GradientButton>

                    <GradientButton
                      size="sm"
                      onClick={() => onAction(request.id, "REJECTED")}
                    >
                      <X size={16} /> Decline
                    </GradientButton>
                  </>
                )}

                {/* Sender control */}
                {isRequester && (
                  <button
                    onClick={() => onAction(request.id, "CANCELLED")}
                    className="px-3 h-8 rounded border text-yellow-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}


export default function Requests() {
  const [swaps, setSwaps] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = getUserFromToken();
    if (u) setUser(u);
  }, []);
  const load = async () => {
    try {
       const data = await getAllSwapsData(user.authUserId);
       const uiSwaps = data.map((swap:any)=>({
        id:swap.id,
        requesterUserId:swap.requesterUserId,
        status:swap.status.toLowerCase(),
        message:swap.message,
        date:timeAgo(swap.createdAt),
        user:{
          name:swap.otherUser.profile.fullName,
          avatar:swap.otherUser.profile.avatar,
          rating:swap.otherUser.profile.averageRating || 0,
          reviews:swap.otherUser.profile.ratings?.length || 0
        },
        skillWanted:swap.wantedSkill.skillName,
        skillOffered:swap.offeredSkill.skillName
       }));
       setSwaps(uiSwaps);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) return;
    load();
  }, [user]);

  const handleAction = async (id: string, status: string) => {
    try {
      const res = await updateSwapStatus(id, status, user.token);
      setSwaps((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, status: res.status.toLowerCase() } : s,
        ),
      );
    } catch (error:any) {
      const msg = error?.response?.data?.message || "Action failed";
      toast.error(msg);
      load();
    }
  };

  const filtered =
    activeTab === "all" ? swaps : swaps.filter((s) => s.status === activeTab);

  return (
    <ProtectedRoute>
      <DashboardLayout >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-4">
            {filtered.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                currentUserId={user.authUserId}
                onAction={handleAction}
              />
            ))}
          </TabsContent>
        </Tabs>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
