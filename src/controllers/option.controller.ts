import { Request, Response } from "express";

import { OptionModel, UserModel } from "../models/index.js";
import { handleErrorHTTP } from "../helpers/handleError.js";
import { AlreadyExistInBD, NotFoundInBD } from "../helpers/errors.js";

const getOptions = async (req: Request, res: Response) => {
	const options = await OptionModel.find({});

	if (!options || options.length === 0) {
		throw new NotFoundInBD("Don't exist roles in the DB.");
	}

	return res.json({ options });
};

const getOption = async (req: Request, res: Response) => {
	try {
		const option = await OptionModel.findById(req.params.id).populate([{ path: "voters" }]);

		if (!option) {
			throw new NotFoundInBD("The role doesn't exist.");
		}

		return res.status(200).json({ option });
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const createOption = async (req: Request, res: Response) => {
	const { option } = req.body;

	try {
		const newOption = new OptionModel({ option });
		await newOption.save();
		return res.json(newOption);
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const updateOption = async (req: Request, res: Response) => {
	const { option, voters } = req.body;

	if (Object.keys(req.body).length === 0) {
		return res.status(400).json({ error: "Request body empty." });
	}

	try {
		const updatedOption = await OptionModel.findByIdAndUpdate(req.params.id, { option, voters }, { new: true });
		console.log(updateOption);
		return res.json({ option: updatedOption });
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const deleteOption = async (req: Request, res: Response) => {
	try {
		const option = await OptionModel.findById(req.params.id);

		if (!option) {
			throw new NotFoundInBD("The option doesn't exist.");
		}

		await OptionModel.findByIdAndDelete(req.params.id);
		return res.status(204).json();
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const addVoteUnregisteredToPoll = async (req: Request, res: Response) => {
	const { option, idVoter } = req.body;

	console.log(req.params.id);

	try {
		const user = await UserModel.findById(idVoter);

		if (!user) {
			throw new NotFoundInBD(`Don't exist user with id ${idVoter}`);
		}

		const optionBD = await OptionModel.findById(option);

		if (!optionBD) {
			throw new NotFoundInBD(`Don't exist option with id ${option}`);
		}

		// Verify that user hasn't vote twice or more
		// console.log(optionBD.voters);
		// const userAlreadyHasVoted = optionBD.voters.includes(user._id);
		// console.log(userAlreadyHasVoted);
		// console.log(user);

		// if (userAlreadyHasVoted) {
		// 	throw new AlreadyExistInBD(`User with id ${req.params.id} already has voted in this poll.`);
		// }

		optionBD.voters.push(user._id);
		await optionBD.save();

		res.json({ optionBD, msg: "Vote saved successfully" });
	} catch (error) {
		handleErrorHTTP(res, error);
	}
};

export { getOption, getOptions, createOption, addVoteUnregisteredToPoll, deleteOption, updateOption };
