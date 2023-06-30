import { Request, Response } from "express";

import { IUser, OptionModel, PollModel, UserModel } from "../models/index.js";
import { handleErrorHTTP } from "../helpers/handleError.js";
import { AlreadyExistInBD, NotFoundInBD } from "../helpers/errors.js";

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
		console.log(optionBD.voters);
		const userAlreadyHasVoted = optionBD.voters.includes(user._id);
		console.log(userAlreadyHasVoted);
		console.log(user);

		if (userAlreadyHasVoted) {
			throw new AlreadyExistInBD(`User with id ${req.params.id} already has voted in this poll.`);
		}

		optionBD.voters.push(user._id);
		await optionBD.save();

		res.json({ optionBD, msg: "Vote saved successfully" });
	} catch (error) {
		handleErrorHTTP(res, error);
	}
};

export { getOptions, createOption, addVoteUnregisteredToPoll };
