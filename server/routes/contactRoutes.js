import { Router } from "express";
import { createContact } from "../controllers/contactController.js";
import { validateContact } from "../middleware/validateContact.js";
import { contactLimiter } from "../middleware/rateLimit.js";

const router = Router();
router.post("/", contactLimiter, validateContact, createContact);

export default router;
