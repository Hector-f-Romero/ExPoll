import { NextFunction, Request, Response } from "express";

import { NotFoundAuthToken, NotFoundInBD, handleErrorHTTP, verifyWT } from "../helpers/";
import { UserModel } from "../models/user.model.js";

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			throw new NotFoundAuthToken("Doesn't exist authorization token in the request");
		}

		const { payload } = await verifyWT(token);

		const user = await UserModel.findById(payload.id);

		if (!user) {
			throw new NotFoundInBD(`The user doesn't exist.`);
		}

		// Save the role and user id in the response object to recover this information in the next middlewares
		res.locals.user = { id: user._id.toString(), role: user.role.toHexString() };

		next();
	} catch (error) {
		handleErrorHTTP(res, error);
	}
};
