import SwapRequest from '../models/swap.model.js';

/**
 * Create swap request
 */

export const createSwap = async(req,res)=>{
    const {
        requesterUserId,
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
export const updateSwapStatus = async(req,res)=>{
    const {id} = req.params;
    const {status} = req.body;
    if(!["ACCEPTED", "REJECTED", "CANCELLED"].includes(status)) {
        return res.status(400).json({message:"Invalid status"})
    }
    const swap = await SwapRequest.findByIdAndUpdate(
        id,
        {status},
        {new:true}
    );
    if(!swap) {
        return res.status(404).json({message:"swap not found"})
    }
    res.json(swap);
}