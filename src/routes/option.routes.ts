import { Router } from "express";
import { check, checkSchema } from "express-validator";

import {
	addVoteUnregisteredToPoll,
	createOption,
	deleteOption,
	getOption,
	getOptions,
	updateOption,
} from "../controllers";
import { validateJWT, validateRequestFields, validateRoles } from "../middlewares";
import { RolesAvailableInDB } from "../models";
import { updateOptionValidation } from "../helpers";

export const optionRouter = Router();

optionRouter.get("/", [validateJWT, validateRoles([RolesAvailableInDB.ADMIN])], getOptions);
optionRouter.get(
	"/:id",
	[
		check("id").isMongoId().withMessage("Invalid poll id"),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN]),
		validateRequestFields,
	],
	getOption
);

optionRouter.post(
	"/",
	[
		check("option")
			.notEmpty()
			.withMessage("Option cannot be empty.")
			.isLength({ min: 3, max: 30 })
			.withMessage("Option must be between 3 and 50 character."),
		validateRequestFields,
	],
	createOption
);
optionRouter.post("/vote/unregistered/:id", addVoteUnregisteredToPoll);

optionRouter.put(
	"/:id",
	checkSchema(updateOptionValidation),
	[
		check("id").isMongoId().withMessage("Invalid poll id"),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN]),
		validateRequestFields,
	],
	updateOption
);

optionRouter.delete(
	"/:id",
	[
		check("id").isMongoId().withMessage("Invalid poll id"),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN]),
		validateRequestFields,
	],
	deleteOption
);
