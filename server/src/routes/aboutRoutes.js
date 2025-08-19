import express from "express";
import {
    createAbout,
    getAllAbouts,
    getAboutById,
    updateAbout,
    deleteAbout,
    addSocialOrCta,
    removeSocialOrCta
} from "../controllers/aboutController.js";

const router = express.Router();

router.post("/", createAbout);
router.get("/", getAllAbouts);
router.get("/:id", getAboutById);
router.put("/:id", updateAbout);
router.delete("/:id", deleteAbout);

router.patch("/:id/items", addSocialOrCta);
router.delete("/:id/items/:type/:itemId", removeSocialOrCta);

export default router;
