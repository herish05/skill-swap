"use client";
import { useEffect, useState } from "react";
import { Edit2, Upload, Star, MapPin, Mail, Calendar, Award, Zap, Share2, Save } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserFromToken } from "@/app/lib/auth";
import { createProfile, getProfile, updateProfile } from "@/app/lib/profile.api";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { getAllSkills } from "@/app/lib/skill.api";
export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading,setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [user,setUser] = useState<any>(null);
  const [email,setEmail] = useState("");
  const [skillsOffered, setOfferedSkills] = useState<any[]>([]);
  const [skillsWanted, setWantedSkills] = useState<any[]>([]);

  const generateAvatar = (name:string)=>{
    const seed = encodeURIComponent(name.trim());
    return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
  }
  const initProfile = async () => {
    if (!user) return;
    const existingProfile = await getProfile(user.authUserId, user.token);
    if (!existingProfile) {
      const newProfile = await createProfile(
        {
          authUserId: user.authUserId,
          fullName: user.email.split("@")[0],
          bio: "",
          location: "",
          skillsOffered: [],
          skillsWanted: [],
        },
        user.token,
      );
      setProfile(newProfile);
    } else {
      setProfile(existingProfile.profile);
    }
    setLoading(false);
  };
  useEffect(() => {
    setUser(getUserFromToken());
  }, []);
  useEffect(()=>{
    if(!user)return;
    setEmail(user.email);
    initProfile();
  },[user])
  const [formData, setFormData] = useState<any>(null);
  useEffect(()=>{
      if(profile) {
        setFormData(profile);
      }
  },[profile])
  useEffect(()=>{
    if(!user?.authUserId || !user?.token)return;
    const findOfferedSkill = async()=>{
      const data = await getAllSkills(user.authUserId,user.token,true);
      setOfferedSkills(data);
    }
    const findWantedSkill = async () => {
      const data = await getAllSkills(user.authUserId, user.token, false);
      setWantedSkills(data);
    };
    findOfferedSkill();
    findWantedSkill();
  },[user])
  // const skillsOffered = [
  //   { name: "UI/UX Design", level: "Expert", endorsements: 24 },
  //   { name: "Figma", level: "Expert", endorsements: 18 },
  //   { name: "Web Design", level: "Advanced", endorsements: 15 },
  //   { name: "User Research", level: "Advanced", endorsements: 12 },
  // ];
  // const skillsWanted = [
  //   { name: "React Development", level: "Beginner", progress: 45 },
  //   { name: "TypeScript", level: "Beginner", progress: 30 },
  //   { name: "Backend Development", level: "Beginner", progress: 20 },
  // ];
  const testimonials = [
    {
      id: 1,
      author: "Michael Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
      text: "Sarah is an amazing designer! She explained everything clearly and I learned so much.",
      date: "2 months ago",
    },
    {
      id: 2,
      author: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      rating: 5,
      text: "Professional and very knowledgeable. Highly recommend!",
      date: "1 month ago",
    },
    {
      id: 3,
      author: "David Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      rating: 4,
      text: "Great experience learning from Sarah. Very helpful!",
      date: "3 weeks ago",
    },
  ];
  const handleSave = async() => {
    const updateData = {
      ...formData,
      avatar:generateAvatar(formData.fullName)
    }
    const res = await updateProfile(user.authUserId,updateData,user.token);
    if(res)toast.success("Profile Updated")
    if(!res)toast.error("Profile not updated")
    setProfile(formData);
    setIsEditing(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev:any) => ({ ...prev, [name]: value }));
  };
  
  // if(loading || !profile)return <p>Loading profile ...</p>
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6 animate-fade-in">
          {/* Profile Header */}
          {!loading ? (
            <Card className="p-6 border border-border">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div
                    className="relative group"
                  >
                    <Avatar className="h-32 w-32">
                      <AvatarImage 
                        src={
                          profile?.avatar || generateAvatar(profile?.fullName || "User")
                        }
                      />
                      <AvatarFallback>
                        {profile?.fullName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    {isEditing && (
                      <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Upload size={20} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Hidden file input */}

                  <div className="text-center md:text-left">
                    {isEditing ? (
                      <Input
                        name="name"
                        value={formData?.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="mb-2"
                      />
                    ) : (
                      <h1 className="text-3xl font-bold text-foreground">
                        {profile?.fullName}
                      </h1>
                    )}
                    <div className="flex items-center justify-center md:justify-start gap-1 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={
                              i < Math.floor(3)
                                ? "fill-warning text-warning"
                                : "text-border"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-foreground ml-2">
                        {profile?.rating} ({profile?.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label>Bio</Label>
                        <Textarea
                          name="bio"
                          value={formData?.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us about yourself..."
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Full Name</Label>
                          <Input
                            name="fullName"
                            value={formData?.fullName}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input
                            name="location"
                            value={formData?.location}
                            onChange={handleInputChange}
                            placeholder="City, Country"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            name="email"
                            type="email"
                            value={email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            disabled
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <GradientButton onClick={handleSave}>
                          <Save size={16} />
                          Save Changes
                        </GradientButton>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setFormData(profile);
                          }}
                          className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{profile?.bio}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin size={18} />
                          {profile?.location}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail size={18} />
                          {email}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar size={18} />
                          Joined{" "}
                          {new Date(profile?.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <GradientButton onClick={() => setIsEditing(true)}>
                          <Edit2 size={16} />
                          Edit Profile
                        </GradientButton>
                        {/* <button className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors flex items-center gap-2">
                        <Share2 size={16} />
                        Share
                      </button> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="w-full max-w-2xl h-64 p-6">
              <div>Loading...</div>
            </Card>
          )}
          {/* Skills Tabs */}
          <Tabs defaultValue="offered" className="space-y-4">
            <TabsList className="bg-secondary gap-1">
              <TabsTrigger value="offered">Skills Offered</TabsTrigger>
              <TabsTrigger value="wanted">Skills Wanted</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>
            {/* Skills Offered */}
            <TabsContent value="offered" className="space-y-3">
              {skillsOffered.map((skill, index) => (
                <Card key={index} className="p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {skill.skillName}
                      </h3>
                      <Badge className="mt-1 bg-success/10 text-success">
                        {skill.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Award size={16} />
                      {skill.endorsements} endorsements
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
            {/* Skills Wanted */}
            <TabsContent value="wanted" className="space-y-3">
              {skillsWanted.map((skill, index) => (
                <Card key={index} className="p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {skill.skillName}
                      </h3>
                      <Badge className="mt-1 bg-info/10 text-info">
                        {skill.level}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{
                        width:
                          skill.level === "BEGINNER"
                            ? "25%"
                            : skill.level === "INTERMEDIATE"
                              ? "50%"
                              : skill.level === "ADVANCED"
                                ? "75%"
                                : "0%",
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {skill.level === "BEGINNER"
                      ? "25%"
                      : skill.level === "INTERMEDIATE"
                        ? "50%"
                        : skill.level === "ADVANCED"
                          ? "75%"
                          : "0%"}
                    progress
                  </p>
                </Card>
              ))}
            </TabsContent>
            {/* Testimonials */}
            <TabsContent value="testimonials" className="space-y-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-4 border border-border">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-foreground">
                          {testimonial.author}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {testimonial.date}
                        </span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < testimonial.rating
                                ? "fill-warning text-warning"
                                : "text-border"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
