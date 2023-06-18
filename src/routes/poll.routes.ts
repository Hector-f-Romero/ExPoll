import { Router } from "express";
import { createPoll, getPolls } from "../controllers/index.js";

const router = Router();

router.get("/", getPolls);
router.post("/", createPoll);

export default router;
