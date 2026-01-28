import express from "express";
import { 
    healthCheck,
    login,
    verifyEmailOtp,
    signup,
    requestPasswordReset,
    resetPassword 
    } from "../controllers/auth.controller.js";
const router = express.Router();
router.get("/health",healthCheck);
router.post("/signup",signup);
router.post("/verify-email", verifyEmailOtp);
router.post("/login", login);
router.post("/password-reset-request", requestPasswordReset);;
router.post("/password-reset-confirm",resetPassword);
export default router;
