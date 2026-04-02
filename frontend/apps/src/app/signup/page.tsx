"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Calendar } from "lucide-react";
import Logo from "@/components/Logo";
import AuthLayout from "@/components/AuthLayout";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientInput } from "@/components/ui/gradient-input";
import GoogleAuthButton from "@/components/GoogleAuthButton";
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
          <div className="w-full flex justify-center">
            <GoogleAuthButton />
          </div>

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
