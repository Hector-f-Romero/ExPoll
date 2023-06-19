import { Request, Response } from "express";
import { Document } from "mongoose";
import bcrypt from "bcrypt";

import { UserModel } from "../models/index.js";
import { handleErrorHTTP } from "../helpers/handleError.js";

const getUsers = async (req: Request, res: Response) => {
	const users = await UserModel.find({});
	return res.json(users);
};

const createUser = async (req: Request, res: Response) => {
	const { names, lastnames, email, password, role } = req.body;

	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	try {
		const user = new UserModel({ names, lastnames, email, password: hashedPassword, role });
		await user.save();
		return res.json(user);
	} catch (error) {
		return handleErrorHTTP(res, error, 500);
	}
};

const updateUser = async (req: Request, res: Response) => {};

export { getUsers, createUser };
