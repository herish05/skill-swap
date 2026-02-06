"use client";
import { Search, Filter, TrendingUp, Users, ArrowLeftRight, Calendar } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import SkillCard from "@/components/SkillCard";
import { GradientInput } from "@/components/ui/gradient-input";
import { GradientButton } from "@/components/ui/gradient-button";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { useEffect, useState } from "react";
import { getUserFromToken } from "../lib/auth";
import { getMatches } from "../lib/skill.api";
const mockUsers = [
	{
		user: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", rating: 4.9, reviews: 28 },
		skillOffered: "UI/UX Design",
		skillWanted: "React Development",
	},
	{
		user: { name: "Michael Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael", rating: 4.7, reviews: 15 },
		skillOffered: "Python",
		skillWanted: "Graphic Design",
	},
	{
		user: { name: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", rating: 4.8, reviews: 42 },
		skillOffered: "Photography",
		skillWanted: "Video Editing",
	},
	{
		user: { name: "David Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", rating: 4.6, reviews: 19 },
		skillOffered: "JavaScript",
		skillWanted: "Data Science",
	},
	{
		user: { name: "Lisa Anderson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa", rating: 5.0, reviews: 8 },
		skillOffered: "Content Writing",
		skillWanted: "SEO",
	},
	{
		user: { name: "James Miller", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James", rating: 4.5, reviews: 33 },
		skillOffered: "Music Production",
		skillWanted: "Marketing",
	},
];

const stats = [
	{ icon: ArrowLeftRight, label: "Active Swaps", value: "12", color: "text-primary" },
	{ icon: Users, label: "Connections", value: "48", color: "text-info" },
	{ icon: TrendingUp, label: "Skills Learned", value: "6", color: "text-success" },
	{ icon: Calendar, label: "Sessions This Week", value: "3", color: "text-warning" },
];

export default function Dashboard() {
  const [user,setUser] = useState<any>();


  useEffect(()=>{
    const u = getUserFromToken();
    if(!u)return;
    setUser(u);
  },[])
  useEffect(()=>{
    const loadMatches = async()=>{
      if(!user)return;
      try {
        const data = await getMatches(user.token);
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    }
    loadMatches();
  },[user])
	return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6 animate-fade-in">
          {/* Welcome section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Alex! 👋</h1>
              <p className="text-muted-foreground">
                Discover new skills to learn and share.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-2xl p-5 border border-border shadow-card"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl bg-secondary ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Search and filters */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <h2 className="text-lg font-semibold mb-4">Find Skills</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <GradientInput
                  placeholder="Search for skills (e.g., Java, Guitar, UI Design)"
                  icon={<Search size={18} />}
                />
              </div>
              <GradientButton variant="outline" className="gap-2">
                <Filter size={18} />
                Filters
              </GradientButton>
            </div>
          </div>

          {/* Skill cards grid */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Recommended Matches</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockUsers.map((data, index) => (
                <SkillCard
                  key={index}
                  user={data.user}
                  skillOffered={data.skillOffered}
                  skillWanted={data.skillWanted}
                  onRequestSwap={() =>
                    console.log("Request swap:", data.user.name)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
