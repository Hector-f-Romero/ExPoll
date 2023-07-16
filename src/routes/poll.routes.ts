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

export const pollRouter = Router();

pollRouter.get("/", getPolls);
pollRouter.get("/:id", [check("id").isMongoId().withMessage("Invalid poll id"), validateRequestFields], getPoll);
pollRouter.get(
	"/user/:id",
	[check("id").isMongoId().withMessage("Invalid poll id"), validateRequestFields],
	getPollsByUser
);
pollRouter.get(
	"/participant/:id",
	[check("id").isMongoId().withMessage("Invalid poll id"), validateRequestFields],
	getPollsAsParticipant
);
pollRouter.get(
	"/duration/:id",
	[check("id").isMongoId().withMessage("Invalid poll id"), validateRequestFields],
	controlDurationPoll
);
pollRouter.post("/", checkSchema(createPollValidation), validateRequestFields, createPoll);
pollRouter.put(
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
pollRouter.put("/finish/:id", finishPoll);
pollRouter.delete(
	"/:id",
	[
		check("id").isMongoId().withMessage("Invalid poll id"),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN]),
		validateRequestFields,
	],
	deletePoll
);
