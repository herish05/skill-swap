import express from "express";

const router = express.Router();
import {
    addSkill,
    searchSkills,
    getUserSkills,
    deleteUser,
    getMatches
} from '../controllers/skill.controller.js';
import { authFirst } from "../middleware/authFirst.js";
router.get("/matches",authFirst,getMatches);
router.post('/',addSkill);
router.get('/user/:authUserId',getUserSkills);
router.get('/search',searchSkills);
router.delete("/:id",deleteUser);
export default router;
