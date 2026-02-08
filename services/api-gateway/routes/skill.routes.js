import express from "express";
import {
    addSkills,
    getUserSkills,
    searchSkills,
    deleteSkill,
    getMatches,
    getSkill
} from '../controllers/skill.controller.js'
import { authFirst } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/",addSkills);
router.get("/user/:authUserId",getUserSkills);
router.get("/search",searchSkills);
router.delete("/:id",deleteSkill);
router.get("/matches",authFirst,getMatches)
router.get("/getSkill/:id",authFirst,getSkill);
export default router;