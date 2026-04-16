import express from "express";
import { createChatRoom, getAllMessages, getOnlineUsers, getUnReadMessagesCount, healthCheck, markMessageAsRead } from "../controllers/chat.controller.js";
import { authFirst } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.get("/health",healthCheck)
router.get("/:swapId/messages", authFirst,getAllMessages);
router.patch("/:swapId/read", authFirst,markMessageAsRead);
router.get("/unread-count/:userId", authFirst,getUnReadMessagesCount);
router.get("/online-users", authFirst,getOnlineUsers);
router.post("/rooms", authFirst,createChatRoom);
export default router;