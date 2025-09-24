import { Router } from "express";
import {
  createSkill,
  deleteSkill,
  getSkill,
  getSkills,
  getSkillsDistribution,
  updateSkill,
} from "../controllers/SkillController.js";

const router = Router();

router.get("/", getSkills);
router.get("/:id", getSkill);

router.get("/stats/all", getSkillsDistribution);

router.post("/create", createSkill);
router.put("/update/:id", updateSkill);

router.delete("/delete/:id", deleteSkill);

export default router;
