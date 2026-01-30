import Message from "../models/message.model.js";
import { onlineUsers } from "../utils/presence.store.js";
export const initChatSocket = (io) =>{

    io.on("connection",(socket)=>{
        console.log("User connected:",socket.id);

        socket.on("registerUser",(userId)=>{
            onlineUsers.set(userId,socket.id);
            io.emit("userOnline",userId);
        })
        socket.on("joinRoom",(swapId)=>{
            socket.join(swapId)
        });
        socket.on("sendMessage",async(data)=>{
            const msg = await Message.create(data);
            io.to(data.swapId).emit("receiveMessage",msg);
        });
        socket.on("disconnect",()=>{
            for(const [userId,id] of onlineUsers.entries()) {
                if(id === socket.id) {
                    onlineUsers.delete(userId);
                    io.emit("userOffline",userId);
                    break;
                }
            }
            console.log("User disconnected:",socket.id);
        });
    });
};