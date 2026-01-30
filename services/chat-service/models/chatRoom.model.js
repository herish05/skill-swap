import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
    swapId:{
        type:String,
        required:true,
        unique:true
    },
    participants:[{type:String,required:true}]
},{timestamps:true})

export default mongoose.model("ChatRoom",chatRoomSchema);