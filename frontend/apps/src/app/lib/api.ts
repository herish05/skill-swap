import axios from "axios"
export const api = axios.create({
  baseURL: "https://api-gateway-wkss.onrender.com",
});

const BASE_URL = "https://api-gateway-wkss.onrender.com";
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token)config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const apiFetch = async(endpoint:string,options:RequestInit={})=>{
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}${endpoint}`,{
        ...options,
        headers:{
            "Content-Type":"application/json",
            Authorization:token?`Bearer ${token}`:"",
            ...options.headers
        }
    })
    if(!res.ok)throw new Error("API error");
    return res.json();
}