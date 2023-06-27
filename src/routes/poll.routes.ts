import { Router } from "express";
import { createPoll, getPoll, getPolls, controlDurationPoll } from "../controllers/index.js";

const router = Router();

router.get("/", getPolls);
router.get("/:id", getPoll);
router.post("/", createPoll);

router.get("/duration/:id", controlDurationPoll);

export default router;
