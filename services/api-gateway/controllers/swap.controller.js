import express from "express";
import axios from "axios";
const SWAP_SERVICE_URL =
  process.env.SWAP_SERVICE_URL || "http://swap-service:4004";
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL;
const CHAT_SERVICE_URL=process.env.CHAT_SERVICE_URL ||"http://chat-service:4007"
export const createSwap = async (req, res) => {
  try {
    const response = await axios.post(`${SWAP_SERVICE_URL}/`,req.body,{ 
      headers:{"x-user-id":req.user.userId}
    });
    const swap = response.data;
    await axios.post(`${NOTIFICATION_SERVICE_URL}/notification`,{
      userId:swap.receiverUserId,
      type:"SWAP_REQUEST",
      title:"New Swap Request",
      message:"You received a new skill swap request",
      metadata:{
        swapId:swap._id,
        requesterUserId: swap.requesterUserId,
        offeredSkillId : swap.offeredSkillId,
        wantedSkillId:swap.wantedSkillId
      }
    });
    res.status(201).json(swap)
  } catch (error) {
    console.error("Create swap error:", error.message);

    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Swap service error" });
  }
};

export const getUserSwaps = async (req, res) => {
  try {
    const response = await axios.get(
      `${SWAP_SERVICE_URL}/user/${req.params.userId}`,
    );

    res.json(response.data);
  } catch (error) {
    console.error("Get swaps error:", error.message);

    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Swap service error" });
  }
};

export const updateSwapStatus = async (req, res) => {
  try {
    const response = await axios.patch(
      `${SWAP_SERVICE_URL}/${req.params.id}/status`,
      req.body,
    );
    const swap = response.data;
    const status = swap.status;
    if(status === "ACCEPTED" || status === "REJECTED") {
      await axios.post(`${NOTIFICATION_SERVICE_URL}/notification`, {
        userId: swap.requesterUserId,
        type: status === "ACCEPTED" ? "SWAP_ACCEPTED" : "SWAP_REJECTED",
        title:
          status === "ACCEPTED"
            ? "Swap Accepted 🎉"
            : "Swap Rejected",
        message:
          status === "ACCEPTED"
            ? "Your skill swap request was accepted"
            : "Your skill swap request was rejected",
        metadata: {
          swapId: swap._id,
          receiverUserId: swap.receiverUserId
        }
      });
      if (status === "ACCEPTED") {
        await axios.post(`${CHAT_SERVICE_URL}/chats/rooms`, {
          swapId: swap._id,
          requesterUserId: swap.requesterUserId,
          receiverUserId: swap.receiverUserId,
        });
      }
    }
    
    res.json(swap);
  } catch (error) {
    console.error("Update swap error:", error.message);

    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Swap service error" });
  }
};