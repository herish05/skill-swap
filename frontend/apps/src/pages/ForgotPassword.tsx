import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Logo from "@/components/Logo";
import AuthLayout from "@/components/AuthLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientInput } from "@/components/ui/gradient-input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic
    console.log("Reset password for:", email);
    setIsSubmitted(true);
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Back link */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>

        {/* Logo */}
        <div className="flex justify-center">
          <Logo size="md" />
        </div>

        {!isSubmitted ? (
          <>
            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
              <p className="text-muted-foreground text-sm">
                No worries! Enter your email and we'll send you a reset link.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <GradientInput
                type="email"
                placeholder="Enter your email"
                icon={<Mail size={20} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <GradientButton type="submit" className="w-full" size="lg">
                Send Reset Link
              </GradientButton>
            </form>
          </>
        ) : (
          /* Success message */
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 text-success">
              <CheckCircle size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Check your email</h1>
              <p className="text-muted-foreground text-sm">
                We've sent a password reset link to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Didn't receive the email?
              </p>
              <GradientButton
                variant="outline"
                onClick={() => setIsSubmitted(false)}
              >
                Try again
              </GradientButton>
            </div>
          </div>
        )}

        {/* Help text */}
        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
