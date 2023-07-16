import { Request, Response } from "express";

import { RoleModel } from "../models/index.js";
import { handleErrorHTTP } from "../helpers/handleError.js";
import { NotFoundInBD } from "../helpers/errors.js";

const getRoles = async (req: Request, res: Response) => {
	try {
		const roles = await RoleModel.find({});

		if (!roles || roles.length === 0) {
			throw new NotFoundInBD("Don't exist roles in the DB.");
		}

		return res.json(roles);
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const getRole = async (req: Request, res: Response) => {
	try {
		const role = await RoleModel.findById(req.params.id);

		if (!role) {
			throw new NotFoundInBD("The role doesn't exist.");
		}

		return res.status(200).json(role);
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const createRole = async (req: Request, res: Response) => {
	try {
		const { role } = req.body;
		const newRole = new RoleModel({ role });
		await newRole.save();
		return res.status(201).json(newRole);
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const updateRole = async (req: Request, res: Response) => {
	try {
		const { role } = req.body;

		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({ error: "Request body empty." });
		}

		if (!role) {
			return res.status(400).json({ error: "Invalid data in body." });
		}

		const updatedRole = await RoleModel.findByIdAndUpdate(
			req.params.id,
			{
				role,
			},
			{ new: true }
		);
		return res.status(200).json({ role: updatedRole });
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const deleteRole = async (req: Request, res: Response) => {
	try {
		const role = await RoleModel.findById(req.params.id);

		if (!role) {
			throw new NotFoundInBD("The user doesn't exist.");
		}

		await RoleModel.findByIdAndDelete(req.params.id);
		return res.status(204).json();
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

export { getRoles, getRole, updateRole, createRole, deleteRole };
