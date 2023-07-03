import { Router } from "express";
import {
	createPoll,
	getPoll,
	getPolls,
	controlDurationPoll,
	getPollsByUser,
	deletePoll,
	updatePoll,
} from "../controllers/index.js";

const router = Router();

router.get("/", getPolls);
router.get("/:id", getPoll);
router.get("/user/:id", getPollsByUser);
router.get("/duration/:id", controlDurationPoll);
router.post("/", createPoll);
router.put("/:id", updatePoll);
router.delete("/:id", deletePoll);

export default router;
