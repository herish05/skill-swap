import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
    requesterUserId:{
        type:String,
        required:true,
        index:true
    },
    receiverUserId:{
        type:String,
        required:true,
        index:true
    },
    offeredSkillId:{
        type:String,
        required:true
    },
    wantedSkillId:{
        type:String,
        required:true
    },
    message:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        enum:['PENDING','ACCEPTED','REJECTED','CANCELLED'],
        default:"PENDING",
        index:true
    }
},{timestamps:true}
);

export default mongoose.model("SwapRequest",swapSchema);