"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { requestPasswordReset,resetPassword } from "../lib/auth.api";
import { useRouter } from "next/navigation";
import AuthProtectedRoute from "@/components/AuthProtectedRoutes";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const otpCode = otp.join("");

  // 📩 Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Enter your email");
      return;
    }

    try {
      setLoading(true);
      await requestPasswordReset({email});
      toast.success("OTP sent to your email ✉️");
      setOtpSent(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Verify OTP
  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) {
      toast.error("Enter complete OTP");
      return;
    }
    if(!newPassword || !confirmPassword)return toast.error("Enter new Password");
    if(newPassword != confirmPassword)return toast.error("Passwords do not match")
    try {
      setLoading(true);
      await resetPassword({email,otp:otpCode,newPassword});
      toast.success("Password reset successfull 🎉");
      router.push("/login")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };
  useEffect(()=>{
    if(otpSent) {
        setTimeout(()=>{
            inputs.current[0]?.focus();
        },100)
    }
  },[otpSent])
  return (
    <AuthProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black p-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl">
          <h1 className="text-3xl font-semibold text-white text-center mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-zinc-400 text-center mb-8">
            {otpSent
              ? "Enter OTP and your new password"
              : "Enter your email to receive OTP"}
          </p>

          {/* 📧 Email Input */}
          {!otpSent && (
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-12 px-4 mb-6 rounded-xl bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          {/* 🔢 OTP Fields */}
          {otpSent && (
            <>
              <div className="flex justify-center gap-4 mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el: any) => (inputs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-14 h-16 text-center text-xl font-semibold 
                           bg-zinc-900 border border-zinc-700 rounded-xl 
                           text-white outline-none 
                           focus:border-white focus:ring-2 focus:ring-white/20 transition"
                  />
                ))}
              </div>
              <input
                type="password"
                placeholder="New Password"
                className="w-full h-12 px-4 mb-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full h-12 px-4 mb-6 rounded-xl bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          {/* 🔘 Button */}
          <button
            className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
            onClick={otpSent ? handleVerifyOtp : handleSendOtp}
            disabled={loading}
          >
            {loading ? "Please wait..." : otpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </div>
      </div>
    </AuthProtectedRoute>
  );
}
