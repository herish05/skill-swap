import express from "express";
import {
    addSkills,
    getUserSkills,
    searchSkills,
    deleteSkill
} from '../controllers/skill.controller.js'
const router = express.Router();
router.post("/",addSkills);
router.get("/user/:authUserId",getUserSkills);
router.get("/search",searchSkills);
router.delete("/:id",deleteSkill);
export default router;