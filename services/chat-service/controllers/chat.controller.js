import Message from "../models/message.model.js";
import ChatRoom from "../models/chatRoom.model.js";
import { onlineUsers } from "../utils/presence.store.js";
export const getAllMessages = async(req,res)=>{
    try{
        const {swapId} = req.params;
        const messages = await Message.find({swapId}).sort({createdAt:1});
        res.json(messages);
    }catch(error) {
        console.error("Get messages error:",error.message);
        res.status(500).json({message:"Failed to fetch chat messages"})
    }
}

export const markMessageAsRead = async (req,res)=>{
    try{
        const {swapId} = req.params;
        const {userId} = req.body;
        const reesult = await Message.updateMany(
            {
                swapId,
                receiverId:userId,
                isRead:false
            },
            {isRead:true}
        );
        res.json({
            message: "Message marked as read",
            updatedCount:reesult.modifiedCount
        });
    }catch(error) {
        console.log("Mark read error: ",error.message);
        res.status(500).josn({message:"Failed to mark messages as read"});
    }
}
export const getUnReadMessagesCount = async(req,res)=>{
    try{
        const {userId} = req.params;
        const counts = await Message.aggregate([
            {
                $match:{
                    receiverId:userId,
                    isRead:false
                }
            },
            {
                $group:{
                    _id:"$swapId",
                    unreadCount:{ $sum:1 }
                }
            }
        ]);
        res.json(counts);

    }catch(error) {
        console.log("Count unread error: ", error.message);
        res.status(500).josn({ message: "Failed to count messages" });
    }
}

export const getOnlineUsers = (req,res)=>{
    res.json([...onlineUsers.keys()])
}


export const createChatRoom = async(req,res)=>{
    try{
        const { swapId, requesterUserId, receiverUserId } = req.body;

        const existing = await ChatRoom.findOne({ swapId });
        if (existing) return res.json(existing);

        const room = await ChatRoom.create({
          swapId,
          participants: [requesterUserId, receiverUserId],
        });

        res.status(201).json(room);
    }catch(error) {
        console.error("Create chat room error:", error.message);
        res.status(500).json({ message: "Failed to create chat room" });
    }
}