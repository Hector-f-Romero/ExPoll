import { Router } from "express";

import { loginUser, revalidateToken } from "../controllers";
import { validateJWT, validateRoles } from "../middlewares";
import { RolesAvailableInDB } from "../models";

const router = Router();

router.get(
	"/renew",
	[validateJWT, validateRoles([RolesAvailableInDB.ADMIN, RolesAvailableInDB.USER])],
	revalidateToken
);
router.post("/login", loginUser);

export default router;
