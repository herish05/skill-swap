import { useState } from "react";
import { Search, Filter, MessageSquare, Video, MapPin, ArrowLeftRight, ChevronDown } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { GradientInput } from "@/components/ui/gradient-input";
import { GradientButton } from "@/components/ui/gradient-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const matchResults = [
  {
    user: { name: "Emily Zhang", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily", rating: 4.9 },
    theyOffer: "UI/UX Design",
    youOffer: "React Development",
    experience: "Expert",
    mode: "Online",
    matchScore: 95,
  },
  {
    user: { name: "Ryan Cooper", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan", rating: 4.7 },
    theyOffer: "Figma Prototyping",
    youOffer: "JavaScript",
    experience: "Intermediate",
    mode: "Both",
    matchScore: 88,
  },
  {
    user: { name: "Sophia Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia", rating: 4.8 },
    theyOffer: "Brand Design",
    youOffer: "TypeScript",
    experience: "Expert",
    mode: "Offline",
    matchScore: 82,
  },
];

const SkillSearch = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Find Skill Matches</h1>
          <p className="text-muted-foreground">Discover people who want to exchange skills with you.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <GradientInput
                placeholder="Search skills you want to learn..."
                icon={<Search size={18} />}
              />
            </div>
            <GradientButton
              variant="outline"
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={16} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </GradientButton>
          </div>

          {/* Filter options */}
          {showFilters && (
            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border animate-fade-in">
              <Select>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Skill Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Session Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Match Results */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Best Matches</h2>
          
          {matchResults.map((match, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* User info */}
                <div className="flex items-center gap-4 lg:w-48">
                  <Avatar className="h-14 w-14 ring-2 ring-primary/10">
                    <AvatarImage src={match.user.avatar} />
                    <AvatarFallback className="gradient-bg text-primary-foreground">
                      {match.user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{match.user.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-warning">★ {match.user.rating}</span>
                      <Badge variant="secondary" className="text-xs">
                        {match.experience}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Skill exchange indicator */}
                <div className="flex-1 bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex-1 text-center">
                      <p className="text-xs text-muted-foreground mb-1">You Offer</p>
                      <p className="font-medium text-primary">{match.youOffer}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center shadow-soft">
                        <ArrowLeftRight size={20} className="text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-xs text-muted-foreground mb-1">They Offer</p>
                      <p className="font-medium text-primary">{match.theyOffer}</p>
                    </div>
                  </div>
                </div>

                {/* Match score */}
                <div className="text-center lg:w-24">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/10 text-success font-bold text-lg">
                    {match.matchScore}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Match</p>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-2 lg:w-36">
                  <GradientButton size="sm" className="flex-1 lg:w-full">
                    <MessageSquare size={16} className="mr-1" />
                    Chat
                  </GradientButton>
                  <GradientButton variant="outline" size="sm" className="flex-1 lg:w-full">
                    <Video size={16} className="mr-1" />
                    Video Call
                  </GradientButton>
                  <GradientButton variant="ghost" size="sm" className="flex-1 lg:w-full">
                    <MapPin size={16} className="mr-1" />
                    Meet
                  </GradientButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SkillSearch;
