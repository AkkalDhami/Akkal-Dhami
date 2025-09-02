import { Router } from "express";
import { addExperience, deleteExperience, getExperiences, updateExperience } from "../controllers/experienceController.js";

const router = Router();

router.get("/", getExperiences);
router.post("/add", addExperience);
router.put("/update/:id", updateExperience);
router.delete("/delete/:id", deleteExperience);

export default router;