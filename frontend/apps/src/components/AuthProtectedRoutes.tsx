"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/app/lib/auth";

export default function AuthProtectedRoute({children}:{children:React.ReactNode}) {
    const router = useRouter();
    useEffect(()=>{
        if(isAuthenticated()) {
            router.replace("/dashboard");
        }
    })
    return <>{children}</>
}