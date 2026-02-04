"use client";
import { useState } from "react";
import { Check, X, Clock, User, MessageSquare, Video } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
		message: "I'd love to learn React from you! I can teach you UI/UX design in return.",
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
		message: "Great! I've accepted your request. Let's schedule our first session.",
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
		message: "Unfortunately, I don't have time right now. Thanks for understanding!",
		status: "declined",
		date: "3 days ago",
	  },
	];

function getStatusColor(status) {
	if (status === "pending") return "bg-warning/10 text-warning";
	if (status === "accepted") return "bg-success/10 text-success";
	if (status === "declined") return "bg-destructive/10 text-destructive";
}
function getStatusIcon(status) {
	if (status === "pending") return <Clock size={16} />;
	if (status === "accepted") return <Check size={16} />;
	if (status === "declined") return <X size={16} />;
}
function RequestCard({ request, tab }) {
	return (
		<Card className="p-4 hover:shadow-lg transition-all duration-200 border border-border">
			<div className="flex gap-4">
				<Avatar className="h-14 w-14 flex-shrink-0">
					<AvatarImage src={request.user.avatar} />
					<AvatarFallback>{request.user.name[0]}</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2 mb-2">
						<div className="flex-1 min-w-0">
							<h3 className="font-semibold text-foreground">{request.user.name}</h3>
							<div className="flex items-center gap-1 text-sm text-muted-foreground">
								<span>⭐ {request.user.rating}</span>
								<span>•</span>
								<span>{request.user.reviews} reviews</span>
							</div>
						</div>
						<Badge className={`${getStatusColor(request.status)} flex gap-1 text-xs`}>
							{getStatusIcon(request.status)}
							{request.status.charAt(0).toUpperCase() + request.status.slice(1)}
						</Badge>
					</div>
					<div className="flex gap-3 mb-3 text-sm">
						<div className="flex items-center gap-1">
							<span className="text-muted-foreground">Wants:</span>
							<span className="font-medium text-primary">{request.skillWanted}</span>
						</div>
						<span className="text-muted-foreground">↔</span>
						<div className="flex items-center gap-1">
							<span className="text-muted-foreground">Offers:</span>
							<span className="font-medium text-primary">{request.skillOffered}</span>
						</div>
					</div>
					<p className="text-sm text-muted-foreground mb-3">{request.message}</p>
					<div className="flex items-center justify-between">
						<span className="text-xs text-muted-foreground">{request.date}</span>
						{tab === "pending" && request.status === "pending" && (
							<div className="flex gap-2">
								<GradientButton size="sm" className="h-8">
									<Check size={16} />
									Accept
								</GradientButton>
								<button className="px-3 h-8 rounded-lg border border-border hover:bg-secondary transition-colors text-sm font-medium">
									<X size={16} className="inline mr-1" />
									Decline
								</button>
							</div>
						)}
						{(tab === "accepted" || tab === "all") && request.status === "accepted" && (
							<div className="flex gap-2">
								<button className="px-3 h-8 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-sm font-medium flex items-center gap-1">
									<MessageSquare size={16} />
									Chat
								</button>
								<button className="px-3 h-8 rounded-lg bg-info hover:bg-info/90 text-info-foreground transition-colors text-sm font-medium flex items-center gap-1">
									<Video size={16} />
									Video Call
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
}


export default function Requests() {
	const [activeTab, setActiveTab] = useState("pending");
	const pendingRequests = requests.filter((r) => r.status === "pending");
	const acceptedRequests = requests.filter((r) => r.status === "accepted");
	const declinedRequests = requests.filter((r) => r.status === "declined");
	return (
		<DashboardLayout>
			<div className="space-y-6 animate-fade-in">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-foreground mb-2">Skill Exchange Requests</h1>
					<p className="text-muted-foreground">Manage your incoming and outgoing skill exchange requests</p>
				</div>
				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="p-4 border border-border">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground mb-1">Pending Requests</p>
								<p className="text-3xl font-bold text-primary">{pendingRequests.length}</p>
							</div>
							<Clock size={32} className="text-warning opacity-20" />
						</div>
					</Card>
					<Card className="p-4 border border-border">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground mb-1">Accepted</p>
								<p className="text-3xl font-bold text-success">{acceptedRequests.length}</p>
							</div>
							<Check size={32} className="text-success opacity-20" />
						</div>
					</Card>
					<Card className="p-4 border border-border">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground mb-1">Declined</p>
								<p className="text-3xl font-bold text-destructive">{declinedRequests.length}</p>
							</div>
							<X size={32} className="text-destructive opacity-20" />
						</div>
					</Card>
				</div>
				{/* Tabs */}
				<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
					<TabsList className="bg-secondary">
						<TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
						<TabsTrigger value="accepted">Accepted ({acceptedRequests.length})</TabsTrigger>
						<TabsTrigger value="all">All Requests ({requests.length})</TabsTrigger>
					</TabsList>
					<TabsContent value="pending" className="space-y-4">
						{pendingRequests.length > 0 ? (
							pendingRequests.map((request) => <RequestCard key={request.id} request={request} tab="pending" />)
						) : (
							<Card className="p-8 text-center border border-border">
								<p className="text-muted-foreground">No pending requests</p>
							</Card>
						)}
					</TabsContent>
					<TabsContent value="accepted" className="space-y-4">
						{acceptedRequests.length > 0 ? (
							acceptedRequests.map((request) => <RequestCard key={request.id} request={request} tab="accepted" />)
						) : (
							<Card className="p-8 text-center border border-border">
								<p className="text-muted-foreground">No accepted requests yet</p>
							</Card>
						)}
					</TabsContent>
					<TabsContent value="all" className="space-y-4">
						{requests.map((request) => (
							<RequestCard key={request.id} request={request} tab="all" />
						))}
					</TabsContent>
				</Tabs>
			</div>
		</DashboardLayout>
	);
}


