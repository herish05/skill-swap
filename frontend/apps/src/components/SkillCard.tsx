import { Star, ArrowLeftRight } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SkillCardProps {
  user: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
  };
  skillOffered: string;
  skillWanted: string;
  onRequestSwap?: () => void;
}

const SkillCard = ({ user, skillOffered, skillWanted, onRequestSwap }: SkillCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border group">
      {/* User info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-12 w-12 ring-2 ring-primary/10">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="gradient-bg text-primary-foreground">
            {user.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star size={14} className="fill-warning text-warning" />
            <span>{user.rating.toFixed(1)}</span>
            <span>({user.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Skill exchange */}
      <div className="bg-secondary/50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 text-center">
            <p className="text-xs text-muted-foreground mb-1">Offers</p>
            <p className="font-medium text-sm">{skillOffered}</p>
          </div>
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ArrowLeftRight size={18} className="text-primary" />
            </div>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs text-muted-foreground mb-1">Wants</p>
            <p className="font-medium text-sm">{skillWanted}</p>
          </div>
        </div>
      </div>

      {/* Action button */}
      <GradientButton
        className="w-full"
        onClick={onRequestSwap}
      >
        Request Swap
      </GradientButton>
    </div>
  );
};

export default SkillCard;
