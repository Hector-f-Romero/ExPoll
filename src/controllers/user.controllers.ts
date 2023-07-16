import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { UserModel } from "../models/index.js";
import { handleErrorHTTP } from "../helpers/handleError.js";
import { NotFoundInBD } from "../helpers/errors.js";

const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await UserModel.find({}).populate([{ path: "role" }]);
		return res.json(users);
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const getUser = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findById(req.params.id).populate([{ path: "role" }, { path: "polls" }]);

		if (!user) {
			throw new NotFoundInBD("The user doesn't exist.");
		}

		return res.json(user);
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const createUser = async (req: Request, res: Response) => {
	const { names, lastnames, email, password, confirmPassword, role, polls } = req.body;

	if (password !== confirmPassword) {
		return res.status(409).json({ error: "The password don't match" });
	}

	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	try {
		const user = new UserModel({ names, lastnames, email, password: hashedPassword, role, polls });
		await user.save();
		return res.json(user);
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		const { names, lastnames, email, password, role, polls } = req.body;

		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({ error: "Request body empty." });
		}

		if (!names && !lastnames && !email && !password && !role && !polls) {
			return res.status(400).json({ error: "Invalid data in body." });
		}

		const updatedUser = await UserModel.findByIdAndUpdate(
			req.params.id,
			{
				names,
				lastnames,
				email,
				password,
				role,
				polls,
			},
			{ new: true }
		);
		return res.status(200).json({ user: updatedUser });
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findById(req.params.id);

		if (!user) {
			throw new NotFoundInBD("The user doesn't exist.");
		}

		await UserModel.findByIdAndDelete(req.params.id);
		return res.status(204).json();
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

export { getUsers, createUser, getUser, updateUser, deleteUser };
