import { Request, Response } from "express";
import { Document } from "mongoose";
import bcrypt from "bcrypt";

import { OptionModel } from "../models/index.js";
import { handleErrorHTTP } from "../helpers/handleError.js";

const getOptions = async (req: Request, res: Response) => {
	const options = await OptionModel.find({});
	return res.json(options);
};

const createOption = async (req: Request, res: Response) => {
	const { option } = req.body;

	try {
		const newOption = new OptionModel({ option });
		await newOption.save();
		return res.json(newOption);
	} catch (error) {
		return handleErrorHTTP(res, error, 500);
	}
};

export { getOptions, createOption };
