import express from "express";
import {
  createProfile,
  updateProfile,
  getProfile,
  healthCheck,
} from "../controllers/user.controller.js";
const router = express.Router();
router.get("/health",healthCheck)
router.get("/profile/:authUserId", getProfile);
router.put("/profile/:authUserId", updateProfile);
router.post("/profile", createProfile);
export default router;
