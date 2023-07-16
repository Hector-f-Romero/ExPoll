import { Router } from "express";
import { check } from "express-validator";

import { getRole, getRoles, createRole, updateRole, deleteRole } from "../controllers";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRoles } from "../middlewares/validateRole.js";
import { RolesAvailableInDB } from "../models/role.model.js";
import { validateRequestFields } from "../middlewares/validationErrors.js";

export const roleRouter = Router();

roleRouter.get("/", [validateJWT, validateRoles([RolesAvailableInDB.ADMIN])], getRoles);
roleRouter.get(
	"/:id",
	[
		check("id").isMongoId().withMessage("Invalid poll id"),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN]),
		validateRequestFields,
	],
	getRole
);
roleRouter.post(
	"/",
	[
		check("role")
			.notEmpty()
			.withMessage("Role cannot be empty.")
			.isLength({ min: 3, max: 30 })
			.withMessage("role must be between 3 and 50 character."),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN]),
		validateRequestFields,
	],
	createRole
);
roleRouter.put(
	"/:id",
	[
		check("id").isMongoId().withMessage("Invalid poll id"),
		check("role")
			.notEmpty()
			.withMessage("Role cannot be empty.")
			.isLength({ min: 3, max: 30 })
			.withMessage("role must be between 3 and 50 character."),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN]),
		validateRequestFields,
	],
	updateRole
);
roleRouter.delete(
	"/:id",
	[
		check("id").isMongoId().withMessage("Invalid poll id"),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN]),
		validateRequestFields,
	],
	deleteRole
);
