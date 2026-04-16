import UserProfile from '..//models/userProfile.model.js';
import mongoose from 'mongoose';

export const healthCheck = async(req,res)=>{
    try {
        res.json({message:"user-service is running"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"user-services health is not good"});
    }
}
export const createProfile = async(req,res)=> {
    const {authUserId,fullName,bio,location} = req.body;
    if(!authUserId || !fullName) {
        return res.status(400).json({error:"userId and full name is required"});
    }
    const existingUser = await UserProfile.findOne({authUserId});
    if(existingUser) {
        return res.status(409).json({error:"Profile already exits"});
    }
    const profile = await UserProfile.create({
        authUserId,
        fullName,
        bio,
        location
    });
    res.status(201).json(profile);
}

export const getProfile = async(req,res)=>{
    const {authUserId} = req.params;
    if (!authUserId || !mongoose.Types.ObjectId.isValid(authUserId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const profile = await UserProfile.findOne({authUserId});
    if(!profile) {
        console.log(profile);
        return res.status(200).json(null);
    }
    res.json({profile})
}

export const updateProfile = async(req,res)=>{
    const {authUserId} = req.params;
    const profile = await UserProfile.findOneAndUpdate(
        {authUserId},
        req.body,
        {new:true}
    );
    if(!profile) {
        return res.status(404).json({error:"Profile not found"});
    }
    res.json(profile)
}