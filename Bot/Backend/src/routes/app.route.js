import { Router } from "express";
import {
  getConversations,
  getMessages,
  handelMessage,
} from "../controller/chat.controller.js";
const router = Router();

router.post("/message", handelMessage);
router.get("/conversations", getConversations);

router.get("/messages/:conversationId", getMessages);
export default router;
