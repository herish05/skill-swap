import {api} from "./api";
export const signupUser = (data:any)=>api.post("/auth/signup",data);
export const loginUser = (data:any) => api.post("/auth/login", data);
export const verifyOtp = (data:any) => api.post("/auth/verify-email", data);
export const requestPasswordReset = (data: any) =>api.post("/auth/password-reset-request",data);
export const resetPassword = (data: any) => api.post("/auth/password-reset-confirm",data);
export const googleLogin = (data:any)=>api.post("/auth/google",data);