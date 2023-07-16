import { Router } from "express";

import { loginUser, revalidateToken } from "../controllers";
import { validateJWT, validateRoles } from "../middlewares";
import { RolesAvailableInDB } from "../models";

export const authRouter = Router();

authRouter.get(
	"/renew",
	[validateJWT, validateRoles([RolesAvailableInDB.ADMIN, RolesAvailableInDB.USER])],
	revalidateToken
);
authRouter.post("/login", loginUser);
