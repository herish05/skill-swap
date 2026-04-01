import express from "express";
import { signup, verifyEmail, login, requestPasswordReset, resetPassword, refreshToken, googleAuth } from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/ratelimiter.js";
const router = express.Router();

router.post("/signup",authLimiter,signup);
router.post("/verify-email", verifyEmail);
router.post("/login",authLimiter,login);
router.post("/password-reset-request",requestPasswordReset);
router.post("/refresh",refreshToken);
router.post("/password-reset-confirm",resetPassword);
router.post("/google",googleAuth);
export default router;
