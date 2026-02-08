import express from "express";

import {
    sendWelcomeEmail,
    sendOtpEmail,
    sendPasswordResetOtp
} from "../controllers/email.controller.js"
const router = express.Router();
router.post("/welcome",sendWelcomeEmail);
router.post("/otp",sendOtpEmail);
router.post("/reset",sendPasswordResetOtp);
export default router;
