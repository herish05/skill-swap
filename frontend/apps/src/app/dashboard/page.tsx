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
import { createSwap } from "../lib/swap.api";
import { toast } from "sonner";
import { useUser } from "@/context/userContext";
import { getAllSwaps } from "../lib/swap.api";
import { searchSkills } from "../lib/skill.api";
// const mockUsers = [
// 	{
// 		user: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", rating: 4.9, reviews: 28 },
// 		skillOffered: "UI/UX Design",
// 		skillWanted: "React Development",
// 	},
// 	{
// 		user: { name: "Michael Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael", rating: 4.7, reviews: 15 },
// 		skillOffered: "Python",
// 		skillWanted: "Graphic Design",
// 	},
// 	{
// 		user: { name: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", rating: 4.8, reviews: 42 },
// 		skillOffered: "Photography",
// 		skillWanted: "Video Editing",
// 	},
// 	{
// 		user: { name: "David Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", rating: 4.6, reviews: 19 },
// 		skillOffered: "JavaScript",
// 		skillWanted: "Data Science",
// 	},
// 	{
// 		user: { name: "Lisa Anderson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa", rating: 5.0, reviews: 8 },
// 		skillOffered: "Content Writing",
// 		skillWanted: "SEO",
// 	},
// 	{
// 		user: { name: "James Miller", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James", rating: 4.5, reviews: 33 },
// 		skillOffered: "Music Production",
// 		skillWanted: "Marketing",
// 	},
// ];

const stats = [
	{ icon: ArrowLeftRight, label: "Active Swaps", value: "12", color: "text-primary" },
	{ icon: Users, label: "Connections", value: "48", color: "text-info" },
	{ icon: TrendingUp, label: "Skills Learned", value: "6", color: "text-success" },
	{ icon: Calendar, label: "Sessions This Week", value: "3", color: "text-warning" },
];

export default function Dashboard() {
  const [userD,setUser] = useState<any>();
  const [matchData,setMatchData] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);
  const [sentSwaps,setSentSwaps] = useState<any[]>([]);
  const [searchQuery,setSearchQuery] = useState("");
  const [searchResults,setSearchResults] = useState<any[]>([]);
  useEffect(()=>{
    const u = getUserFromToken();
    if(!u)return;
    setUser(u);
  },[])
  useEffect(() => {
    const loadMatches = async () => {
      if (!userD) return;
      try {
        const data = await getMatches(userD.token);
        if (Array.isArray(data)) {
          setMatchData(data);
        } else {
          setMatchData([]);
        }

        // console.log(data);
      } catch (error) {
        console.log(error);
        setMatchData([]);
      } finally {
        setLoading(false);
      }
    };
    loadMatches();
  }, [userD]);
  useEffect(()=>{
    const loadSwaps = async()=>{
      if (!userD) return;
      try {
        const swaps = await getAllSwaps(userD.authUserId);
        setSentSwaps(Array.isArray(swaps)?swaps:[]);
      } catch (error) {
        setSentSwaps([]);
      }
    }
    loadSwaps();
  },[userD])


  useEffect(()=>{
    const delay = setTimeout(async()=>{
      if(!searchQuery){
        setSearchResults([]);
        return;
      }

      try{
        const data = matchData.length >0?matchData.filter((match)=>{
          const q = searchQuery.toLowerCase();
          return (
            match.skillOffered?.toLowerCase().includes(q) ||
            match.skillWanted?.toLowerCase().includes(q) ||
            match.user?.name?.toLowerCase().includes(q) 
          )
        }):[];
        setSearchResults(data);
      }catch(error) {
        console.log("skill search error"+error)
      }
    },400)
  },[searchQuery])
  const getSwapStatus = (receiverId:string,offeredSkillId:string,wantedSkillId:string)=>{
    const swap = sentSwaps.find((s)=>
      s.requesterUserId === userD.authUserId &&
      s.receiverUserId === receiverId && 
      s.offeredSkillId === offeredSkillId && 
      s.wantedSkillId === wantedSkillId
    );
    return swap?.status || null;
  }
  const handleRequestSwap = async(id:string,offeredSkillId:string,wantedSkillId:string)=>{
    const status = getSwapStatus(id, offeredSkillId, wantedSkillId);
    if (status === "PENDING") {
      toast.error("You already sent this request");
      return;
    }
    if (status === "ACCEPTED") {
      toast.error("Swap already active. Start your session!");
      return;
    }
    try{
      
      await createSwap(id,offeredSkillId,wantedSkillId,"Hey ,want to swap?");
      toast.success("Swap request send 🚀")
    }catch(error:any) {
      if(error.response?.status === 409) {
        toast.error("Swap request already exists");
      }else {
        toast.error("Failed to send swap request")
      }
    }
  }
  const { user } = useUser();
  const dataToShow = searchQuery?searchResults:matchData;
	return (
    <ProtectedRoute>
      <DashboardLayout>
        net
        <div className="space-y-6 animate-fade-in">
          {/* Welcome section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {user?.fullName || "User"}! 👋
              </h1>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <GradientButton variant="outline" className="gap-2">
                <Filter size={18} />
                Filters
              </GradientButton>
            </div>
          </div>

          {/* Skill cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p>Finding best matches for you...</p>
            ) : matchData.length === 0 ? (
              <p>No matches yet. Add more skills to get matched.</p>
            ) : (
              dataToShow.map((data) => {
                const status = getSwapStatus(
                  data.user.id,
                  data.offeredSkillId,
                  data.wantedSkillId,
                );
                console.log(status);
                return (
                  <SkillCard
                    key={`${data.user.id}-${data.offeredSkillId}-${data.wantedSkillId}`}
                    user={{
                      name: data.user.name,
                      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${data.user.name}`,
                      rating: data.user.rating,
                      reviews: data.user.reviews,
                    }}
                    skillOffered={data.skillOffered}
                    skillWanted={data.skillWanted}
                    swapStatus={status}
                    onRequestSwap={() =>
                      handleRequestSwap(
                        data.user.id,
                        data.offeredSkillId,
                        data.wantedSkillId,
                      )
                    }
                  />
                );
              })
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
