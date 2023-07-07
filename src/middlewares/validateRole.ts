import { NextFunction, Request, Response } from "express";

import { NotFoundInBD, UserWithoutPermits, handleErrorHTTP } from "../helpers";
import { RoleModel } from "../models";

export const validateRoles = (rolesAllowed: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const rolesInBD = await RoleModel.find({ _id: rolesAllowed });

			if (rolesInBD.length === 0) {
				throw new NotFoundInBD("Don't exist roles for this action or role doesn't exist.");
			}

			// Verify if the user has a role id of the allowed roles established
			const userHasPermissions = rolesInBD.some((roleBD) => roleBD._id.toHexString() === res.locals.user.role);

			if (!userHasPermissions) {
				throw new UserWithoutPermits("The user don't have the permissions for this action.");
			}

			next();
		} catch (error) {
			handleErrorHTTP(res, error);
		}
	};
};
