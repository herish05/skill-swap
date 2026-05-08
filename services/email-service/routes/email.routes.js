import express from "express";

import {
    sendWelcomeEmail,
    sendOtpEmail,
    sendPasswordResetOtp,
    healthCheck
} from "../controllers/email.controller.js"
const router = express.Router();
router.post("/welcome",sendWelcomeEmail);
router.post("/otp",sendOtpEmail);
router.post("/reset",sendPasswordResetOtp);
router.get("/health",healthCheck);
export default router;
