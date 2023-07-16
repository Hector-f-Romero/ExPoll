import { Router } from "express";
import { check, checkSchema } from "express-validator";

import { createUser, deleteUser, getUser, getUsers, updatePoll } from "../controllers/index.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRoles } from "../middlewares/validateRole.js";
import { RolesAvailableInDB } from "../models/role.model.js";
import { validateRequestFields } from "../middlewares/validationErrors.js";
import { createUserValidation, updateUserValidation } from "../helpers/validators.js";

export const userRouter = Router();

userRouter.get("/", [validateJWT, validateRoles([RolesAvailableInDB.ADMIN, RolesAvailableInDB.USER])], getUsers);
userRouter.get(
	"/:id",
	[
		check("id").isMongoId().withMessage("Invalid poll id"),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN, RolesAvailableInDB.USER]),
		validateRequestFields,
	],
	getUser
);
userRouter.post("/", checkSchema(createUserValidation), validateRequestFields, createUser);
userRouter.put(
	"/:id",
	checkSchema(updateUserValidation),
	[
		check("id").isMongoId().withMessage("Invalid poll id"),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN]),
		validateRequestFields,
	],
	updatePoll
);
userRouter.delete(
	"/:id",
	[
		check("id").isMongoId().withMessage("Invalid poll id"),
		validateJWT,
		validateRoles([RolesAvailableInDB.ADMIN]),
		validateRequestFields,
	],
	deleteUser
);
