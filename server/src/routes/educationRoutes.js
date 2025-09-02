import { Router } from "express";
import { addEducation, deleteEducation, getEducation, updateEducation } from "../controllers/educationController.js";

const router = Router();

router.get("/", getEducation);
router.post("/add", addEducation);
router.put("/update/:id", updateEducation);
router.delete("/delete/:id", deleteEducation);

export default router;