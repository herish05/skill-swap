import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    expiresAt :{
        type:Date,
        required:true
    },
    purpose:{
        type:String,
        enum:['email-verification','password-reset'],
        required:true
    }
},
{_id:false}
);
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true,
        index:true
    },
    passwordHash:{
        type:String,
        required:function(){
            return this.provider === "LOCAL";
        }
    },
    refreshToken:{
        type:String
    },
    provider:{
        type:String,
        enum:["LOCAL","GOOGLE","GITHUB"],
        default:"LOCAL"
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    providerId:String,
    fullName: String,
    avatar:String,

    otp:otpSchema,
    lastLoginAt:{
        type:Date
    },
    dateofbirth:{
        type:Date,
        required:function(){
            return this.provider === "LOCAL";
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
},
{
    timestamps:true // automatically manage createdAt and updatedAt fields
}
);

export default mongoose.model("User",userSchema);