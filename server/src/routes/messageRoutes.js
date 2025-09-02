import { Router } from "express";
import { addMessage, deleteMessage, getMessage, getMessages, markMessageAsRead, updateMessage } from "../controllers/messageController.js";

const router = Router();

router.get("/", getMessages);
router.get("/:id", getMessage);
router.post("/send", addMessage);
router.put("/update/:id", updateMessage);
router.patch('/:id/read', markMessageAsRead);
router.delete("/delete/:id", deleteMessage);

export default router;