import express from "express";
import {
    createAbout,
    getAbout,
    updateAbout,
    addSocialOrCta,
    removeSocialOrCta,
    addMyContactDetails,
    updateMyContactDetails,
} from "../controllers/aboutController.js";

const router = express.Router();

router.post("/", createAbout);
router.get("/", getAbout);
router.put("/:id", updateAbout);

router.post("/my-contact/add", addMyContactDetails)
router.put("/my-contact/update/:id", updateMyContactDetails)

router.patch("/:id/items", addSocialOrCta);
router.delete("/:id/items/:type/:itemId", removeSocialOrCta);

export default router;
