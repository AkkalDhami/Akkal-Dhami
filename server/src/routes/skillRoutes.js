
import { Router } from "express";
import {
    createSkill,
    deleteSkill,
    getSkill,
    getSkills,
    updateSkill
} from "../controllers/SkillController.js";

const router = Router();

router.get("/", getSkills)
router.get("/:id", getSkill)

router.post("/create", createSkill)
router.put("/update/:id", updateSkill)

router.delete("/delete/:id", deleteSkill)


export default router;