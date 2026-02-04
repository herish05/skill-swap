import {api} from "./api";
export const signupUser = (data:any)=>api.post("/auth/signup",data);
export const loginUser = (data:any) => api.post("/auth/login", data);
export const verifyOtp = (data:any) => api.post("/auth/verify-email", data);

