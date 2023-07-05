import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

import { NotFoundAuthToken, handleErrorHTTP } from "../helpers/index.js";

const secret = new TextEncoder().encode(process.env.SECRET_JWT);

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			throw new NotFoundAuthToken("Doesn't exist authorization token in the request");
		}

		const { payload } = await jwtVerify(token, secret, {
			issuer: "expoll.dev",
			audience: "expoll.com",
		});

		next();
	} catch (error) {
		handleErrorHTTP(res, error);
	}
};
