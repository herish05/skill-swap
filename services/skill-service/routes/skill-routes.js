import express from "express";

const router = express.Router();
import {
    addSkill,
    searchSkills,
    getUserSkills,
    deleteUser
} from '../controllers/skill.controller.js';
router.post('/',addSkill);
router.get('/user/:authUserId',getUserSkills);
router.get('/search',searchSkills);
router.delete("/:id",deleteUser);
export default router;
