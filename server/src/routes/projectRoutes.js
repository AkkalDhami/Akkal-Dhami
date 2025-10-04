
import { Router } from "express";
import {
    createProject,
    deleteProject,
    getProject,
    getProjects,
    updateProject
} from "../controllers/projectController.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/", getProjects)
router.get("/:id", getProject)

router.post("/create",
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 10 },
    ]), createProject)

router.put("/update/:id", 
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 10 },
    ]),
    updateProject)

router.delete("/delete/:id", deleteProject)


export default router;