import express from "express";
import { signup, verifyEmail, login } from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/ratelimiter.js";
const router = express.Router();

router.post("/signup",authLimiter,signup);
router.post("/verify-email", verifyEmail);
router.post("/login",authLimiter,login);

export default router;
