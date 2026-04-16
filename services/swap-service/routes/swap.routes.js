import express from 'express';
import {
    createSwap,
    getUserSwaps,
    getUserSwapsWithName,
    healthCheck,
    updateSwapStatus
} from '../controllers/swap.controller.js';
const router = express();
router.get("/health",healthCheck)
router.post("/",createSwap);
router.get("/user/:userId",getUserSwaps);
router.patch("/:id/status",updateSwapStatus);
router.get("/user/:userId/all", getUserSwapsWithName);
export default router;
