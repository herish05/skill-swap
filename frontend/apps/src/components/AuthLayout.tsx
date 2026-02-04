import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  illustration?: ReactNode;
}

const AuthLayout = ({ children, illustration }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md animate-fade-in">
          {children}
        </div>
      </div>
      
      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 gradient-bg items-center justify-center p-12 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl animate-float-delayed" />
        </div>
        
        {illustration ? (
          <div className="relative z-10">
            {illustration}
          </div>
        ) : (
          <div className="relative z-10 text-primary-foreground text-center">
            <SkillExchangeIllustration />
          </div>
        )}
      </div>
    </div>
  );
};

const SkillExchangeIllustration = () => (
  <div className="flex flex-col items-center gap-8">
    <div className="flex items-center gap-6">
      {/* Person 1 */}
      <div className="flex flex-col items-center gap-3 animate-float">
        <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <span className="text-3xl">🎨</span>
        </div>
        <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-4 py-2">
          <p className="text-sm font-medium">Design</p>
        </div>
      </div>
      
      {/* Exchange arrows */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-0.5 bg-primary-foreground/50" />
        <div className="flex gap-1">
          <span className="text-2xl">⟷</span>
        </div>
        <div className="w-12 h-0.5 bg-primary-foreground/50" />
      </div>
      
      {/* Person 2 */}
      <div className="flex flex-col items-center gap-3 animate-float-delayed">
        <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <span className="text-3xl">💻</span>
        </div>
        <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-4 py-2">
          <p className="text-sm font-medium">Coding</p>
        </div>
      </div>
    </div>
    
    <div className="max-w-xs text-center">
      <h2 className="text-2xl font-bold mb-2">Learn by Teaching</h2>
      <p className="text-primary-foreground/80 text-sm">
        Connect with others who have the skills you want, and share what you know.
      </p>
    </div>
  </div>
);

export default AuthLayout;
