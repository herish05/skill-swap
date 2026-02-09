import express from 'express';
import {
    createSwap,
    getUserSwaps,
    getUserSwapsWithName,
    updateSwapStatus
} from '../controllers/swap.controller.js';
const router = express();
router.post("/",createSwap);
router.get("/user/:userId",getUserSwaps);
router.patch("/:id/status",updateSwapStatus);
router.get("/user/:userId/all", getUserSwapsWithName);
export default router;
