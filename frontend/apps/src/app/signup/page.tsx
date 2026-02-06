"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Calendar } from "lucide-react";
import Logo from "@/components/Logo";
import AuthLayout from "@/components/AuthLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientInput } from "@/components/ui/gradient-input";
import {signupUser} from "../lib/auth.api";
import { useRouter } from "next/navigation";
import AuthProtectedRoute from "@/components/AuthProtectedRoutes";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const skills = [
	"Web Development",
	"Mobile Development",
	"UI/UX Design",
	"Graphic Design",
	"Data Science",
	"Machine Learning",
	"Digital Marketing",
	"Photography",
	"Video Editing",
	"Music Production",
	"Writing",
	"Language Teaching",
	"Public Speaking",
	"Business Strategy",
	"Finance",
];

export default function SignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		dateofbirth:"",
		password: "",
		confirmPassword: "",
	});
	const router = useRouter();
	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		if(formData.password !== formData.confirmPassword) {
			toast.error("Password do not match");
			return;
		}
		try{
			const res = await signupUser({
        		email: formData.email,
        		password: formData.password,
        		dateofbirth: formData.dateofbirth,
      	});
		localStorage.setItem("verify-email",formData.email);
		toast.success("Account created! Verify Email.");
		router.push("/verify-email");
		}catch(error) {
			console.log("in sign up ",error)
			toast.error("Signup failed");
		}
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
    <AuthProtectedRoute>
      <AuthLayout>
        <div className="space-y-6">
          {/* Logo and tagline */}
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Logo size="md" />
            </div>
            <p className="text-muted-foreground text-sm">
              Create your account and start exchanging skills
            </p>
          </div>

          {/* Sign up form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <GradientInput
              type="text"
              placeholder="Full Name"
              icon={<User size={20} />}
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              required
            />

            <GradientInput
              type="email"
              placeholder="Email address"
              icon={<Mail size={20} />}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
            <GradientInput
              type="date"
              placeholder="Date of Birth"
              icon={<Calendar size={20} />}
              value={formData.dateofbirth}
              onChange={(e) => handleChange("dateofbirth", e.target.value)}
              required
            />
            <div className="relative">
              <GradientInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                icon={<Lock size={20} />}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
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

            <div className="relative">
              <GradientInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                icon={<Lock size={20} />}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <GradientButton type="submit" className="w-full" size="lg">
              Create Account
            </GradientButton>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Google signup */}
          <GradientButton variant="google" className="w-full" size="lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </GradientButton>

          {/* Login link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </AuthLayout>
    </AuthProtectedRoute>
  );
}
