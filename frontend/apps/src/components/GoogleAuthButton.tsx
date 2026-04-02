"use client"

import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@/app/lib/auth.api";
import { toast } from "sonner";

export default function GoogleAuthButton() {
    return (
        <div className="flex justify-center w-full">
            <GoogleLogin
                onSuccess={async (res) => {
                    try {
                        const response = await googleLogin({ credential: res.credential });
                        const { accessToken, refreshToken } = response.data;
                        localStorage.setItem("token", accessToken);
                        localStorage.setItem("refreshToken", refreshToken);
                        toast.success("Google Login Successful 🚀");
                        window.location.href = "/dashboard";
                    } catch (error: any) {
                        const data = error.response?.data;
                        toast.error(data?.message || "Google Login Failed");
                    }
                }}
                onError={() => toast.error("Google Login failed")}
                useOneTap
            />
        </div>
    );
}