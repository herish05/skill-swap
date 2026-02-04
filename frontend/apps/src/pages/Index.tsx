import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeftRight, Users, Video, Star, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";
import { GradientButton } from "@/components/ui/gradient-button";

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

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            <Link to="/login">
              <GradientButton variant="ghost">Log In</GradientButton>
            </Link>
            <Link to="/signup">
              <GradientButton>Get Started</GradientButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden" style={{ background: '#fff', color: '#111' }}>
        {/* Background decorations */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

        <div className="container mx-auto text-center relative z-10" style={{ color: '#111' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Sparkles size={16} />
            Join 10,000+ skill swappers
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{ color: '#111' }}>
            Exchange Skills.{" "}
            <span className="gradient-text">Grow Together.</span>
          </h1>
          
          <p className="text-lg max-w-2xl mx-auto mb-8 animate-fade-in" style={{ color: '#222' }}>
            Connect with people who have the skills you want to learn. Share what you know, 
            learn what you need – no money required.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link to="/signup">
              <GradientButton size="xl" className="gap-2">
                Start Swapping <ArrowRight size={20} />
              </GradientButton>
            </Link>
            <Link to="/dashboard">
              <GradientButton variant="outline" size="xl">
                Explore Skills
              </GradientButton>
            </Link>
          </div>

          {/* Hero illustration */}
          <div className="mt-16 flex justify-center gap-8 flex-wrap animate-fade-in">
            <div className="flex items-center gap-4 bg-card rounded-2xl p-6 shadow-card border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl animate-float">
                🎨
              </div>
              <div className="text-left">
                <p className="font-semibold">Design</p>
                <p className="text-sm text-muted-foreground">UI/UX, Graphic</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center shadow-soft">
                <ArrowLeftRight size={24} className="text-primary-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-4 bg-card rounded-2xl p-6 shadow-card border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl animate-float-delayed">
                💻
              </div>
              <div className="text-left">
                <p className="font-semibold">Coding</p>
                <p className="text-sm text-muted-foreground">React, Python</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4" style={{ background: '#fff', color: '#111' }}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#111' }}>Why SkillSwap?</h2>
            <p className="max-w-xl mx-auto" style={{ color: '#222' }}>
              A new way to learn and teach, powered by community and mutual growth.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 shadow-card border border-border hover:shadow-card-hover transition-all duration-300 group"
                style={{ background: '#fff', color: '#111', borderColor: '#eee' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: '#e0e7ff' }}>
                  <feature.icon size={24} style={{ color: '#3b82f6' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: '#111' }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: '#333' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#8BE8E5] via-[#fff] to-[#B6E2A1]">
              {/* About Section */}
              <section className="py-20 px-4 bg-[#E8F6EF]">
                <div className="container mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-4">About SkillSwap</h2>
                  <p className="max-w-2xl mx-auto text-muted-foreground mb-6">SkillSwap is a global community where people exchange knowledge and skills for free. Our mission is to make learning accessible, fun, and social for everyone.</p>
                </div>
              </section>

              {/* How It Works Section */}
              <section className="py-20 px-4 bg-gradient-to-r from-[#A084E8] via-[#fff] to-[#8BE8E5]">
                <div className="container mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                  <ol className="list-decimal list-inside max-w-xl mx-auto text-left text-muted-foreground">
                    <li>Sign up and create your profile.</li>
                    <li>List the skills you want to learn and offer to teach.</li>
                    <li>Get matched, connect, and start swapping skills!</li>
                  </ol>
                </div>
              </section>

              {/* Success Stories Section */}
              <section className="py-20 px-4 bg-[#FFF7E0]">
                <div className="container mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
                  <p className="max-w-2xl mx-auto text-muted-foreground mb-6">Read how SkillSwap has helped thousands of people learn new skills, make friends, and grow their careers.</p>
                  <div className="grid md:grid-cols-3 gap-8 mt-8">
                    <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                      <span className="text-4xl">🎨</span>
                      <p className="mt-2">Sarah learned React in exchange for teaching UI design. "Best learning experience ever!"</p>
                    </div>
                    <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                      <span className="text-4xl">💻</span>
                      <p className="mt-2">Michael picked up photography skills while teaching Python. "Win-win!"</p>
                    </div>
                    <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                      <span className="text-4xl">📸</span>
                      <p className="mt-2">Emma made friends and learned new skills. "The community here is amazing."</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="py-20 px-4 bg-gradient-to-r from-[#B6E2A1] via-[#fff] to-[#A084E8]">
                <div className="container mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                  <div className="max-w-2xl mx-auto text-left text-muted-foreground">
                    <p className="mb-2"><strong>Is SkillSwap free?</strong> Yes, it's 100% free to join and use.</p>
                    <p className="mb-2"><strong>How do I find a skill partner?</strong> Our smart matching algorithm helps you connect instantly.</p>
                    <p className="mb-2"><strong>Can I teach and learn at the same time?</strong> Absolutely! Many members do both.</p>
                  </div>
                </div>
              </section>

              {/* Contact/Join Community Section */}
              <section className="py-20 px-4 bg-[#F3F0FF]">
                <div className="container mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                  <p className="max-w-2xl mx-auto text-muted-foreground mb-6">Ready to start your learning journey? Connect with thousands of learners and teachers worldwide.</p>
                  <Link to="/signup">
                    <GradientButton size="xl" className="gap-2">
                      Create Free Account <ArrowRight size={20} />
                    </GradientButton>
                  </Link>
                </div>
              </section>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Loved by Learners</h2>
            <p className="text-muted-foreground">See what our community has to say.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="gradient-bg rounded-3xl p-12 text-center text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Swapping?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Join thousands of learners and teachers exchanging skills every day.
              </p>
              <Link to="/signup">
                <GradientButton size="xl" variant="secondary" className="gap-2">
                  Create Free Account <ArrowRight size={20} />
                </GradientButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            © 2024 SkillSwap. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
