import SwapRequest from '../models/swap.model.js';
import axios from "axios";
/**
 * Create swap request
 */
const USER_SERVICE = process.env.USER_SERVICE;
const SKILL_SERVICE = process.env.SKILL_SERVICE;

export const healthCheck = async(req,res)=>{
    try {
        res.json({message:"swap-service is running"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"swap-services health is not good"});
    }
}
export const createSwap = async(req,res)=>{
    const requesterUserId = req.headers["x-user-id"]
    const {
        receiverUserId,
        offeredSkillId,
        wantedSkillId,
        message
    } = req.body;
    if (receiverUserId === requesterUserId) {
      return res.status(400).json({ message: "Cannot swap with yourself" });
    }
    const existing = await SwapRequest.findOne({
        requesterUserId,
        receiverUserId,
        offeredSkillId,
        wantedSkillId,
        status:"PENDING"
    });
    if(existing) {
        return res.status(409).json({message:"Swap request already exists"})
    }
    const swap = await SwapRequest.create({
        requesterUserId,
        receiverUserId,
        offeredSkillId,
        wantedSkillId,
        message
    });
    res.status(201).json(swap);
}

/**
 * Get user swaps
 */
export const getUserSwaps=async(req,res)=>{
    const {userId} = req.params;
    const swaps = await SwapRequest.find({
        $or:[
            {receiverUserId:userId},
            {requesterUserId:userId}
        ]
    }).sort({createdAt:-1})
    if(!swaps) {
        return res.status(404).json({message:"Not found"})
    }
    res.json(swaps);
}
/**
 * update  swap status
 */
export const getUserSwapsWithName = async(req,res)=>{
    const {userId} = req.params;
    const swaps = await SwapRequest.find({
        $or:[
            {receiverUserId:userId},
            {requesterUserId:userId}
        ]
    });
    const fullData = await Promise.all(
        swaps.map(async(swap)=>{
            const otherUserId = swap.requesterUserId === userId?swap.receiverUserId:swap.requesterUserId;
            const offeredSkill = await axios.get(`${SKILL_SERVICE}/getSkill/${swap.offeredSkillId}`);
            const wantedSkill = await axios.get(
              `${SKILL_SERVICE}/getSkill/${swap.wantedSkillId}`,
            );
            const userDetails = await axios.get(
              `${USER_SERVICE}/profile/${otherUserId}`,
            );
            return {
                id:swap._id,
                status:swap.status,
                message:swap.message,
                createdAt:swap.createdAt,
                receiverUserId:swap.receiverUserId,
                requesterUserId:swap.requesterUserId,
                offeredSkill:offeredSkill.data,
                wantedSkill:wantedSkill.data,
                otherUser:userDetails.data
            }
        })
    )
    res.json(fullData);
}
export const updateSwapStatus = async(req,res)=>{
    const {id} = req.params;
    const {status} = req.body;
    const userId = req.headers["x-user-id"];

    const swap = SwapRequest.findById(id);
    if(!swap) return res.status(404).json({message:"Swap not found"});
    if(swap.status === "CANCELLED") {
        return res.status(409).json({message:"Request already cancelled"});
    }
    if(status === "ACCCEPTED" && swap.receiverUserId !== userId) {
        return res.status(403).json({message:"Only receiver can accept"});
    }
    if(status === "CANCELLED" && swap.requesterUserId !== userId) {
        return res.status(403).json({message:"Only requester can cancel"});
    }
    swap.status = status;
    await swap.save();
    res.json(swap);
}