"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyOtp } from "../lib/auth.api";

export default function VerifyEmail() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email,setEmail] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);

  const otpCode = otp.join("");
    useEffect(()=>{
        const storedEmail = localStorage.getItem("verify-email");
        if(!storedEmail) {
            router.push("/signup");
        }else {
            setEmail(storedEmail);
        }
    },[])
  const verifyEmailOtp = async () => {
    if (otpCode.length !== 6) {
      toast.error("Enter complete OTP");
      return;
    }

    try {
      setLoading(true);

      await verifyOtp({ email,otp: otpCode }); // backend already knows email from session or previous step

      toast.success("Email verified successfully 🎉");
      router.push("/login");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black p-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl">
        <h1 className="text-3xl font-semibold text-white text-center mb-2">
          Verify Email
        </h1>
        <p className="text-sm text-zinc-400 text-center mb-8">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex justify-center gap-4 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }}
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

        <button
          className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
          onClick={verifyEmailOtp}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Account"}
        </button>
        
      </div>
    </div>
  );
}
