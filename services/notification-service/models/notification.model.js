import mongoose  from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        index:true
    },
    type:{
        type:String,
        enum:["SWAP_REQUEST","SWAP_ACCEPTED","SWAP_REJECTED"],
        required:true
    },
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    metadata:{
        type:Object
    },
    isRead:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
);
export default mongoose.model("Notification",notificationSchema);