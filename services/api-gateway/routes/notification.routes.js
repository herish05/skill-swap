import express from "express";
import {
    getUnreadNotificationCount,
  getUserNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller.js";
import { authFirst } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/user/:userId", authFirst,getUserNotifications);
router.patch("/:id/read", authFirst,markNotificationAsRead);
router.get("/user/:userId/unread-count",authFirst,getUnreadNotificationCount);
export default router;
