import express from 'express';
import {
    createSwap,
    getUserSwaps,
    updateSwapStatus
} from '../controllers/swap.controller.js';
const router = express();
router.post("/",createSwap);
router.get("/user/:userId",getUserSwaps);
router.patch("/:id/status",updateSwapStatus);
export default router;
