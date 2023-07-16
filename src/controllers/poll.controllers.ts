import { Request, Response } from "express";
import { EventEmitter } from "events";
import { PollModel, OptionModel, IPoll, UserModel } from "../models/index.js";
import { handleErrorHTTP } from "../helpers/handleError.js";
import { NotFoundInBD } from "../helpers/errors.js";

const eventEmitter = new EventEmitter();

const getPolls = async (req: Request, res: Response) => {
	const polls = await PollModel.find({});
	return res.json(polls);
};

const getPoll = async (req: Request, res: Response) => {
	try {
		const poll = await PollModel.findById(req.params.id).populate([{ path: "options" }, { path: "createdBy" }]);

		if (!poll) {
			return res.status(404).json({ error: `Poll with id ${req.params.id} doesn't exist.` });
		}

		return res.json({ poll });
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const getPollsByUser = async (req: Request, res: Response) => {
	try {
		const polls = await PollModel.find({ createdBy: req.params.id }).populate([
			{ path: "options" },
			{ path: "createdBy" },
		]);

		if (!polls) {
			return res.status(404).json({ error: `Polls with id ${req.params.id} don't exist.` });
		}

		return res.json(polls);
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const getPollsAsParticipant = async (req: Request, res: Response) => {
	try {
		// 1. Get all the options where the user has participated
		const votedOptons = await OptionModel.find({ voters: req.params.id });

		// 2. Find all the polls where the key "options" contain any of the options found previusly
		const polls = await PollModel.find({
			options: { $in: votedOptons.map((option) => option._id.toHexString()) },
		}).populate([{ path: "options" }, { path: "createdBy" }]);
		return res.json(polls);
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const createPoll = async (req: Request, res: Response) => {
	try {
		const { title, description, createdBy, verified, duration, options } = req.body;

		// 1. Rectify that the creator of poll exist
		const user = await UserModel.findById(createdBy);

		if (!user) {
			throw new NotFoundInBD("Creator id doesn't exist in BD.");
		}

		// 2. Create the options in BD first.
		const optionsMongo: object[] = [];
		await Promise.all(
			options.map(async (option: object) => {
				const newOption = new OptionModel({ option: option });
				await newOption.save();
				optionsMongo.push(newOption._id);
			})
		);
		const poll = new PollModel({ title, description, createdBy, verified, options: optionsMongo });

		// 3. First save the document to obtain the createdAt key. With this value, is possible to set the finishAt
		await poll.save();
		const createdAt = new Date(poll.createdAt);
		createdAt.setSeconds(createdAt.getSeconds() + Number(duration));
		const finishAt = createdAt.toISOString();

		// 4. Update the document with the finish date of poll
		const updatedPoll = await PollModel.findByIdAndUpdate(poll.id, { finishAt: finishAt }, { new: true });

		// 5. Link poll to user
		user.polls?.push(poll.id);
		await user.save();

		return res.json({ poll: updatedPoll });
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const updatePoll = async (req: Request, res: Response) => {
	const { title, description, createdBy, duration, completed, verified, options, finishAt } = req.body;

	if (Object.keys(req.body).length === 0) {
		return res.status(400).json({ error: "Request body empty." });
	}

	if (!title && !description && !createdBy && !duration && !completed && !verified && !options && !finishAt) {
		return res.status(400).json({ error: "Invalid data in body." });
	}

	try {
		const updatedPoll = await PollModel.findByIdAndUpdate(
			req.params.id,
			{
				title,
				description,
				createdBy,
				duration,
				completed,
				verified,
				options,
				finishAt,
			},
			{ new: true }
		);
		return res.status(200).json({ poll: updatedPoll });
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const deletePoll = async (req: Request, res: Response) => {
	try {
		await PollModel.findByIdAndDelete(req.params.id);
		return res.status(204).json();
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const controlDurationPoll = async (req: Request, res: Response) => {
	// console.log("Client connected");
	res.writeHead(200, {
		"Content-Type": "text/event-stream",
		Connection: "keep-alive",
		"Cache-Control": "no-cache",
	});

	let poll: IPoll | null;

	// 1. Find the poll in BD
	try {
		poll = await PollModel.findById(req.params.id);

		if (!poll) {
			res.write(`error: "Poll don't found"\n\n`);
			res.end();
			return;
			// throw new Error("Poll don't exists in BD")
		}

		if (poll?.completed === true) {
			// console.log("Ya se completó");
			res.write(`event: finishPoll\n`);
			res.write(`data: "Finished"\n\n`);
			res.end();

			return;
		}
	} catch (error) {
		res.write(`error: "Error"\n\n`);
		res.end();
		return;
	}

	//TODO: verify if is possible avoid the non-null assersion operator
	const finishDateinSeconds = new Date(poll!.finishAt).getTime();
	const currentDate = new Date().getTime();
	let countDownTimer = Math.trunc((finishDateinSeconds - currentDate) / 1000);

	const updateCompletePoll = async () => {
		await PollModel.findByIdAndUpdate(poll?.id, { completed: true });
	};

	eventEmitter.once("customEvent", (data) => {
		res.write(`event: finishPoll\n`);
		res.write(`data: "Finished"\n\n`);
		res.end();
	});

	const intervalId = setInterval(() => {
		if (countDownTimer <= 0) {
			updateCompletePoll();
			res.write(`event: finishPoll\n`);
			res.write(`data: "Finished"\n\n`);
			res.end();
		} else {
			countDownTimer -= 1;
			res.write(`data: ${countDownTimer}\n\n`);
		}
	}, 1000);

	res.on("close", () => {
		// console.log("Client closed connection.");
		clearInterval(intervalId);
		return res.end();
	});
};

const finishPoll = async (req: Request, res: Response) => {
	try {
		// const poll = await PollModel.findByIdAndUpdate(req.params.id, { completed: true,finishAt:new Date().toISOString() });
		const poll = await PollModel.findById(req.params.id);

		if (!poll) {
			throw new NotFoundInBD("Poll doesn't exist in BD.");
		}

		// Check if the poll already has finished
		const currentDate = new Date();

		if (currentDate.valueOf() > poll.finishAt.valueOf()) {
			return res.status(409).json({ error: "The poll already has finished." });
		}
		console.log(currentDate.toISOString());

		await PollModel.updateOne({ _id: poll.id }, { completed: true, finishAt: currentDate.toISOString() });

		//TODO: Notify to countdown that the poll has finished
		eventEmitter.emit("customEvent", "Custom event data");
		return res.status(200).json(poll);
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

export {
	getPolls,
	getPollsByUser,
	getPollsAsParticipant,
	createPoll,
	getPoll,
	updatePoll,
	controlDurationPoll,
	finishPoll,
	deletePoll,
};
