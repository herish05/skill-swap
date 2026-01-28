import express from "express";
import {
  createNotification,
  getUnReadCount,
  getUserNotifications,
  markAsRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/", createNotification);
router.get("/user/:userId", getUserNotifications);
router.patch("/:id/read", markAsRead);
router.get("/user/:userId/unread-count",getUnReadCount);
export default router;
