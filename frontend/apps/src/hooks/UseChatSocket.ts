import { useEffect,useRef } from "react";
import {io,Socket} from "socket.io-client";
export const useChatSocket = (userId:string)=>{
    const socketRef = useRef<Socket | null>(null);
    useEffect(()=>{
        const socket = io("https://chat-service-i9if.onrender.com");
        socketRef.current = socket;
        socket.on("connect",()=>{
            socket.emit("registerUser",userId);
        });
        return ()=>{
            socket.disconnect();
        };
    },[userId]);
    return socketRef;
}