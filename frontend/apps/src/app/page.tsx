"use client";
import Link from "next/link";
import { ArrowRight, ArrowLeftRight, Users, Video, Star, Sparkles, Github, Twitter, Linkedin } from "lucide-react";
import Logo from "@/components/Logo";
import { GradientButton } from "@/components/ui/gradient-button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "framer-motion";

const features = [
  {
    icon: ArrowLeftRight,
    title: "Skill Exchange",
    description: "Trade skills instead of money. Teach what you know, learn what you need.",
  },
  {
    icon: Users,
    title: "Smart Matching",
    description: "Our algorithm finds the perfect skill swap partners based on your profile.",
  },
  {
    icon: Video,
    title: "Video Sessions",
    description: "Learn face-to-face through high-quality video calls with screen sharing.",
  },
  {
    icon: Star,
    title: "Build Reputation",
    description: "Earn ratings and reviews to become a trusted member of the community.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "UX Designer",
    avatar: "🎨",
    quote: "I learned React in exchange for teaching UI design. Best learning experience ever!",
  },
  {
    name: "Michael Park",
    role: "Developer",
    avatar: "💻",
    quote: "SkillSwap helped me pick up photography skills while teaching Python. Win-win!",
  },
  {
    name: "Emma Wilson",
    role: "Photographer",
    avatar: "📸",
    quote: "The community here is amazing. I've made both friends and learned new skills.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 rounded-full glass border border-white/20 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all"
      >
        {/* Top reflection light effect */}
        <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 h-16 flex items-center justify-between relative z-10">
          <Logo size="sm" />

          {!isAuth ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/login" className="hidden sm:block">
                <button className="text-base sm:text-lg font-medium hover:text-primary transition-colors px-3 py-2">Log In</button>
              </Link>
              <Link href="/signup">
                <GradientButton className="rounded-full px-5 py-2 text-base shadow-md shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                  Get Started
                </GradientButton>
              </Link>
              <div className="ml-1 pl-3 border-l border-border/50">
                <ThemeToggle />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/dashboard" className="text-base sm:text-lg font-medium hover:text-primary transition-colors hidden sm:block">
                Dashboard
              </Link>
              <Link href="/dashboard/profile" className="text-base sm:text-lg font-medium hover:text-primary transition-colors hidden sm:block">
                Profile
              </Link>
              <Link href="/skills/add" className="text-base sm:text-lg font-medium hover:text-primary transition-colors hidden sm:block">
                Add Skills
              </Link>
              
              <div className="flex items-center gap-3 pl-3 border-l border-border/50">
                <ThemeToggle />
                
                {/* Profile Avatar */}
                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors flex items-center justify-center text-sm border border-primary/20"
                  >
                    👤
                  </button>

                  {open && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute right-0 mt-3 w-48 bg-card border border-border rounded-2xl shadow-xl overflow-hidden p-1.5"
                    >
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-muted rounded-xl transition-colors text-sm sm:hidden"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 hover:bg-muted rounded-xl transition-colors text-sm"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 relative flex flex-col items-center justify-center min-h-[90vh]">
        {/* Glow decorations */}
        <div className="absolute top-1/4 -translate-y-1/2 left-1/4 w-[500px] h-[500px] bg-primary/20 dark:bg-primary/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/20 dark:bg-indigo-500/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <Sparkles size={16} />
            Join 10,000+ skill swappers
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
          >
            Exchange Skills. <br className="hidden sm:block" />
            <span className="gradient-text drop-shadow-md">Grow Together.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 text-muted-foreground leading-relaxed"
          >
            Connect with people who have the skills you want to learn. Share
            what you know, learn what you need – no money required.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <GradientButton size="xl" className="gap-2 rounded-full px-8 py-6 shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all text-base font-semibold">
                Start Swapping <ArrowRight size={20} />
              </GradientButton>
            </Link>
            <Link href="/dashboard">
              <button className="px-8 py-4 rounded-full border-2 border-border hover:border-primary/40 bg-card/50 hover:bg-card text-foreground font-semibold shadow-md transition-all duration-300">
                Explore Skills
              </button>
            </Link>
          </motion.div>

          {/* Hero illustration / Avatars */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
            className="mt-20 flex justify-center items-center gap-4 sm:gap-8 flex-wrap"
          >
            <motion.div 
              whileHover={{ y: -6, rotate: -2 }}
              className="flex items-center gap-4 glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden group shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/15 flex items-center justify-center text-3xl">
                🎨
              </div>
              <div className="text-left relative z-10 pr-2">
                <p className="font-bold">Design</p>
                <p className="text-xs sm:text-sm text-muted-foreground">UI/UX, Graphic</p>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="flex flex-shrink-0 items-center justify-center -mx-2 sm:mx-0 z-10"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full gradient-bg flex items-center justify-center shadow-xl shadow-primary/30 border-4 border-background">
                <ArrowLeftRight size={24} className="text-white" />
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -6, rotate: 2 }}
              className="flex items-center gap-4 glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden group shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-500/15 flex items-center justify-center text-3xl">
                💻
              </div>
              <div className="text-left relative z-10 pr-2">
                <p className="font-bold">Coding</p>
                <p className="text-xs sm:text-sm text-muted-foreground">React, Python</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/30 relative">
        <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why SkillSwap?</h2>
            <p className="max-w-xl mx-auto text-muted-foreground text-lg">
              A new way to learn and teach, powered by community and mutual growth.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <feature.icon size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Learners</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              See what our community has to say about their skill exchange journeys.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card/40 backdrop-blur-sm rounded-3xl p-8 flex flex-col h-full hover:shadow-xl hover:shadow-primary/5 border border-border/50 hover:border-primary/20 transition-all duration-300"
              >
                <p className="text-muted-foreground italic mb-8 flex-grow text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl shrink-0 shadow-inner">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-bg rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white drop-shadow-sm">
                Ready to Start Swapping?
              </h2>
              <p className="text-white/90 mb-10 text-lg sm:text-xl font-medium">
                Join thousands of learners and teachers exchanging skills every day. It's totally free to sign up.
              </p>
              <Link href="/signup">
                <button className="bg-white text-primary font-bold text-lg px-10 py-4 rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300">
                  Create Free Account
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Multi-column Footer */}
      <footer className="pt-20 pb-10 px-4 bg-muted/20 border-t border-border mt-10">
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1 border-b border-border pb-8 md:border-0 md:pb-0">
              <Logo size="md" />
              <p className="text-muted-foreground mt-6 mb-6 leading-relaxed max-w-sm">
                SkillSwap is a global community where people exchange knowledge and skills for free. Make learning accessible and fun.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Github size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Platform</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block">Find a Skill</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block">How it Works</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block">Success Stories</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block">Help Center</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block">Safety Guidelines</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block">Community Rules</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
              <p className="text-muted-foreground mb-4">Subscribe to our newsletter for the latest updates and featured skills.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-card border border-border rounded-xl px-4 py-3 w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
                <button className="bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
