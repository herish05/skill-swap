
"use client";
import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Monitor, MessageSquare, Users, MoreVertical, Maximize, Clock, StickyNote } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const VideoCall = () => {
	const [isMuted, setIsMuted] = useState(false);
	const [isVideoOff, setIsVideoOff] = useState(false);
	const [showNotes, setShowNotes] = useState(false);
	const [notes, setNotes] = useState("");

	return (
		<div className="h-screen bg-foreground flex flex-col">
			{/* Header */}
			<div className="h-16 px-6 flex items-center justify-between bg-foreground/95 border-b border-muted-foreground/20">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
						<span className="text-primary-foreground font-medium">Skill Exchange Session</span>
					</div>
					<div className="flex items-center gap-2 text-muted-foreground">
						<Clock size={16} />
						<span className="text-sm">45:23</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<GradientButton variant="ghost" size="sm" className="text-primary-foreground">
						<Users size={18} className="mr-2" />
						2 Participants
					</GradientButton>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 flex overflow-hidden">
				{/* Video area */}
				<div className="flex-1 p-4 flex flex-col gap-4">
					{/* Main video */}
					<div className="flex-1 relative bg-muted-foreground/10 rounded-2xl overflow-hidden">
						{/* Remote video placeholder */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="text-center">
								<Avatar className="h-32 w-32 mx-auto mb-4">
									<AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
									<AvatarFallback className="text-4xl">SC</AvatarFallback>
								</Avatar>
								<p className="text-primary-foreground text-xl font-medium">Sarah Chen</p>
								<p className="text-muted-foreground">Teaching: UI/UX Design</p>
							</div>
						</div>

						{/* Fullscreen button */}
						<button className="absolute top-4 right-4 p-2 bg-foreground/50 hover:bg-foreground/70 rounded-lg transition-colors">
							<Maximize size={18} className="text-primary-foreground" />
						</button>

						{/* Self preview */}
						<div className="absolute bottom-4 right-4 w-48 h-36 bg-muted-foreground/20 rounded-xl overflow-hidden border-2 border-primary-foreground/20">
							<div className="w-full h-full flex items-center justify-center">
								{isVideoOff ? (
									<div className="text-center">
										<Avatar className="h-12 w-12 mx-auto">
											<AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
											<AvatarFallback>AJ</AvatarFallback>
										</Avatar>
										<p className="text-primary-foreground text-xs mt-1">You</p>
									</div>
								) : (
									<div className="text-center">
										<Avatar className="h-12 w-12 mx-auto">
											<AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
											<AvatarFallback>AJ</AvatarFallback>
										</Avatar>
										<p className="text-primary-foreground text-xs mt-1">You</p>
									</div>
								)}
							</div>
						</div>

						{/* Skill exchange indicator */}
						<div className="absolute top-4 left-4 bg-foreground/80 backdrop-blur-sm rounded-xl px-4 py-2">
							<p className="text-primary-foreground text-sm">
								<span className="text-primary">Learning:</span> UI/UX Design
							</p>
						</div>
					</div>

					{/* Controls */}
					<div className="flex items-center justify-center gap-4">
						<button
							onClick={() => setIsMuted(!isMuted)}
							className={cn(
								"p-4 rounded-full transition-all duration-200",
								isMuted
									? "bg-destructive text-primary-foreground"
									: "bg-muted-foreground/20 text-primary-foreground hover:bg-muted-foreground/30"
							)}
						>
							{isMuted ? <MicOff size={22} /> : <Mic size={22} />}
						</button>

						<button
							onClick={() => setIsVideoOff(!isVideoOff)}
							className={cn(
								"p-4 rounded-full transition-all duration-200",
								isVideoOff
									? "bg-destructive text-primary-foreground"
									: "bg-muted-foreground/20 text-primary-foreground hover:bg-muted-foreground/30"
							)}
						>
							{isVideoOff ? <VideoOff size={22} /> : <Video size={22} />}
						</button>

						<button className="p-4 rounded-full bg-muted-foreground/20 text-primary-foreground hover:bg-muted-foreground/30 transition-all duration-200">
							<Monitor size={22} />
						</button>

						<button className="p-4 rounded-full bg-muted-foreground/20 text-primary-foreground hover:bg-muted-foreground/30 transition-all duration-200">
							<MessageSquare size={22} />
						</button>

						<button
							onClick={() => setShowNotes(!showNotes)}
							className={cn(
								"p-4 rounded-full transition-all duration-200",
								showNotes
									? "gradient-bg text-primary-foreground"
									: "bg-muted-foreground/20 text-primary-foreground hover:bg-muted-foreground/30"
							)}
						>
							<StickyNote size={22} />
						</button>

						<button className="p-4 rounded-full bg-destructive text-primary-foreground hover:bg-destructive/90 transition-all duration-200">
							<PhoneOff size={22} />
						</button>
					</div>
				</div>

				{/* Notes panel */}
				{showNotes && (
					<div className="w-80 bg-card border-l border-border flex flex-col animate-slide-in-left">
						<div className="p-4 border-b border-border">
							<h3 className="font-semibold text-foreground">Session Notes</h3>
							<p className="text-xs text-muted-foreground">Keep track of what you're learning</p>
						</div>
						<div className="flex-1 p-4">
							<textarea
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
								placeholder="Take notes during your session..."
								className="w-full h-full bg-secondary rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default VideoCall;
