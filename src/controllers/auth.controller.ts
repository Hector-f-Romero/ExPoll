import { Request, Response } from "express";
import bcrypt from "bcrypt";

import "dotenv/config";

import { UserModel } from "../models/index.js";
import { handleErrorHTTP } from "../helpers/handleError.js";
import { generateJWT } from "../helpers/index.js";

const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(404).json({ error: `User with email ${email} doesn't exist.` });
		}

		const isCorrectPassword = await bcrypt.compare(password, user.password);

		if (!isCorrectPassword) {
			return res.status(400).json({ error: `The password is incorrect` });
		}

		const token = await generateJWT(user.id, user.role.toHexString());

		return res.status(200).json({ user, token });
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const revalidateToken = async (req: Request, res: Response) => {
	try {
		const { id, role } = res.locals.user;
		const newToken = await generateJWT(id, role);
		return res.status(200).json({ newToken });
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

export { loginUser, revalidateToken };
