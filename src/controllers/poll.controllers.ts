import { Request, Response } from "express";
import { PollModel, OptionModel, IOption, IPoll } from "../models/index.js";
import { handleErrorHTTP } from "../helpers/handleError.js";

const getPolls = async (req: Request, res: Response) => {
	const polls = await PollModel.find({});
	return res.json(polls);
};

const getPoll = async (req: Request, res: Response) => {
	try {
		const poll = await PollModel.findById(req.params.id).populate([{ path: "options" }]);

		if (!poll) {
			return res.status(404).json({ error: `Poll with id ${req.params.id} doesn't exist.` });
		}

		return res.json(poll);
	} catch (error) {
		return handleErrorHTTP(res, error, 500);
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
		return handleErrorHTTP(res, error, 500);
	}
};

const createPoll = async (req: Request, res: Response) => {
	const { title, description, createdBy, duration, options } = req.body;

	// Create first the options in BD
	const optionsMongo: object[] = [];
	await Promise.all(
		options.map(async (option: object) => {
			const newOption = new OptionModel({ option: option });
			await newOption.save();
			optionsMongo.push(newOption._id);
		})
	);
	const poll = new PollModel({ title, description, createdBy, duration, options: optionsMongo });

	// First save the document to obtain the createdAt key. With this value, is possible to set the finishAt
	await poll.save();
	const createdAt = new Date(poll.createdAt);
	createdAt.setSeconds(createdAt.getSeconds() + Number(duration));
	const finishAt = createdAt.toISOString();

	// Update the document with the finish date of poll
	const updatedPoll = await PollModel.findByIdAndUpdate(poll.id, { finishAt: finishAt }, { new: true });
	return res.json({ msg: "Ok", poll: updatedPoll });
};

const updatePoll = async (req: Request, res: Response) => {
	const { title, description, createdBy, duration, completed, verified, options, finishAt } = req.body;
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
		return res.status(200).json({ updatedPoll });
	} catch (error) {
		return handleErrorHTTP(res, error);
	}
};

const deletePoll = async (req: Request, res: Response) => {
	try {
		await PollModel.findByIdAndDelete(req.params.id);
		return res.status(204).json();
	} catch (error) {
		return handleErrorHTTP(res, error, 500);
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

export { getPolls, getPollsByUser, createPoll, getPoll, updatePoll, controlDurationPoll, deletePoll };
