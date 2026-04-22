"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Logo from "@/components/Logo";
import AuthLayout from "@/components/AuthLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientInput } from "@/components/ui/gradient-input";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { toast } from "sonner";
import { loginUser } from "../lib/auth.api";
import { useRouter } from "next/navigation";
import AuthProtectedRoute from "@/components/AuthProtectedRoutes";
export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		// Handle login logic
		if(!email || !password){
			toast.error("Fill all fields");
			return;
		} 
		try {
			 	const res = await loginUser({email,password});
				const token = res.data.accessToken;
				localStorage.setItem("token", token);
        localStorage.setItem("refreshToken",res.data.refreshToken);
				toast.success("Login Successfull 🚀")
				router.push("/dashboard");
		} catch (error:any) {
			const data = error.response?.data;
			// console.log("Hello")
      		if (data?.requiredVerification) {
        		localStorage.setItem("verify-email", data?.email);
				toast.info("verify your email first.OTP sent.")
				router.push("/verify-email")
      		}
			else {
				toast.error(data?.message || "Login failed");
			}
		}
	};

	return (
    <AuthProtectedRoute>
      <AuthLayout>
        <div className="space-y-8">
          {/* Logo and tagline */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <p className="text-muted-foreground">
              Exchange Skills. Grow Together.
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <GradientInput
                type="email"
                placeholder="Email address"
                icon={<Mail />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <GradientInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  icon={<Lock/>}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <GradientButton type="submit" className="w-full" size="lg">
              Log In
            </GradientButton>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google login */}
          <div className="w-full flex justify-center">
            <GoogleAuthButton />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </AuthLayout>
    </AuthProtectedRoute>
  );
}
