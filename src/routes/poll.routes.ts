import { Router } from "express";
import { check, checkSchema } from "express-validator";

import {
	createPoll,
	getPoll,
	getPolls,
	controlDurationPoll,
	getPollsByUser,
	deletePoll,
	updatePoll,
	getPollsAsParticipant,
	finishPoll,
} from "../controllers/index.js";
import { validateJWT, validateRequestFields, validateRoles } from "../middlewares";
import { RolesAvailableInDB } from "../models";
import { createPollValidation, updatePollValidation } from "../helpers";

const router = Router();

router.get("/", getPolls);
router.get("/:id", [check("id").isMongoId().withMessage("Invalid poll id"), validateRequestFields], getPoll);
router.get(
	"/user/:id",
	[check("id").isMongoId().withMessage("Invalid poll id"), validateRequestFields],
	getPollsByUser
);
router.get(
	"/participant/:id",
	[check("id").isMongoId().withMessage("Invalid poll id"), validateRequestFields],
	getPollsAsParticipant
);
router.get(
	"/duration/:id",
	[check("id").isMongoId().withMessage("Invalid poll id"), validateRequestFields],
	controlDurationPoll
);
router.post("/", checkSchema(createPollValidation), validateRequestFields, createPoll);
router.put(
	"/:id",
	checkSchema(updatePollValidation),
	[
		check("id").isMongoId().withMessage("Invalid poll id"),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN, RolesAvailableInDB.USER]),
		validateRequestFields,
	],

	updatePoll
);
router.put("/finish/:id", finishPoll);
router.delete(
	"/:id",
	[
		check("id").isMongoId().withMessage("Invalid poll id"),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN]),
		validateRequestFields,
	],
	deletePoll
);

export default router;
