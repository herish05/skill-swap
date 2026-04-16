import express from "express";

const router = express.Router();
import {
    addSkill,
    searchSkills,
    getUserSkills,
    deleteUser,
    getMatches,
    getSkillById,
    healthCheck
} from '../controllers/skill.controller.js';
// import { authFirst } from "../middleware/authFirst.js";
router.get("/health",healthCheck)
router.get("/matches",getMatches);
router.post('/',addSkill);
router.get('/user/:authUserId',getUserSkills);
router.get('/search',searchSkills);
router.delete("/:id",deleteUser);
router.get("/getSkill/:id",getSkillById);
export default router;
