import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";
const router = express.Router();
router.post("/profile", createProfile);
router.get("/profile/:authUserId", getProfile);
router.put("/profile/:authUserId", updateProfile);

export default router;
