import { Router } from "express";
import {
	createPoll,
	getPoll,
	getPolls,
	controlDurationPoll,
	getPollsByUser,
	deletePoll,
	updatePoll,
	getPollsAsParticipant,
} from "../controllers/index.js";
import { validateJWT, validateRoles } from "../middlewares/index.js";
import { RolesAvailableInDB } from "../models";

const router = Router();

router.get("/", getPolls);
router.get("/:id", getPoll);
router.get("/user/:id", getPollsByUser);
router.get("/participant/:id", getPollsAsParticipant);
router.get("/duration/:id", controlDurationPoll);
router.post("/", createPoll);
router.put("/:id", [validateJWT, validateRoles([RolesAvailableInDB.ADMIN, RolesAvailableInDB.USER])], updatePoll);
router.delete("/:id", deletePoll);

export default router;
