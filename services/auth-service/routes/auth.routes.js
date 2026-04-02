import express from "express";
import { googleAuth } from "../controllers/auth.controller.js";
import { 
    healthCheck,
    login,
    verifyEmailOtp,
    signup,
    requestPasswordReset,
    resetPassword, 
    refreshToken,
    googleAuth
    } from "../controllers/auth.controller.js";
const router = express.Router();
router.get("/health",healthCheck);
router.post("/signup",signup);
router.post("/verify-email", verifyEmailOtp);
router.post("/login", login);
router.post("/refresh",refreshToken);
router.post("/password-reset-request", requestPasswordReset);;
router.post("/password-reset-confirm",resetPassword);
router.post("/google", googleAuth);
export default router;
