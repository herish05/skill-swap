import express from "express";
import { createProfile,updateProfile,getProfile } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/profile/:authUserId",getProfile);
router.post("/profile/:authUserId", updateProfile);
router.post("/profile", createProfile);
export default router;