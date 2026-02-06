import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
    day:{
        type:String,
        enum:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    }
},
{_id:false}
);
const ratingSchema = new mongoose.Schema({
    rating:{
        type:Number,
        min:3,
        max:5
    },
    review:String,
    ratedBy:{
        type:mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},
{_id:false}
);
const userProfileSchema = new mongoose.Schema({
    authUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
        index:true
    },
    fullName: {
        type: String,
        required: true
    },
    bio: {
        type:String,
        maxlength:500
    },
    location :{
        type:String
    },
    skillsOffered:[
        {
            type:String
        }
    ],
    skillsWanted:[
        {
            type:String
        }
    ],
    availability:[availabilitySchema],
    ratings:[ratingSchema],
    averageRating:{
        type:Number,
        default:0
    }
},
{timestamps:true}
);
export default mongoose.model('UserProfile',userProfileSchema);