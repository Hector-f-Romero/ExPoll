import { Request, Response } from "express";

import { OptionModel, PollModel, RolesAvailableInDB, UserModel } from "../models/index.js";
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
	try {
		const { option, idVoter } = req.body;

		const user = await UserModel.findById(idVoter);

		// Know if the user exists in DB.
		if (!user) {
			throw new NotFoundInBD(`Don't exist user with id ${idVoter}`);
		}

		// Prove if the option exist in DB.
		const optionDB = await OptionModel.findById(option);

		if (!optionDB) {
			throw new NotFoundInBD(`Don't exist option with id ${option}`);
		}

		// Confirm that the option belong to a poll and exist
		const pollDB = await PollModel.findById(req.params.id);
		if (!pollDB) {
			throw new NotFoundInBD(`Don't exist poll related with the option id ${option}`);
		}

		// Check if the poll already has finished
		const currentDate = new Date();

		if (currentDate.valueOf() > pollDB.finishAt.valueOf()) {
			return res.status(409).json({ error: "The poll already has finished." });
		}

		// Verify that user hasn't vote twice or more
		const userAlreadyHasVoted = optionDB.voters.includes(user._id);

		// The poll only can allow multiple votes from unregistered user.
		if (userAlreadyHasVoted) {
			if (user.role.toHexString() !== RolesAvailableInDB.UNREGISTERED) {
				throw new AlreadyExistInBD(`User with id ${user.id} already has voted in this poll.`);
			}
		}

		optionDB.voters.push(user._id);
		await optionDB.save();

		return res.status(201).json({ optionBD: optionDB });
	} catch (error) {
		handleErrorHTTP(res, error);
	}
};

export { getOption, getOptions, createOption, addVoteUnregisteredToPoll, deleteOption, updateOption };
