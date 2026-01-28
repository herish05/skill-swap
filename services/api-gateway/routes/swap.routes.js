import express from "express";
import {
  createSwap,
  getUserSwaps,
  updateSwapStatus,
} from "../controllers/swap.controller.js";
import { authFirst } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", authFirst,createSwap);
router.get("/user/:userId", authFirst,getUserSwaps);
router.patch("/:id/status", authFirst,updateSwapStatus);

export default router;
