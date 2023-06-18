import { Request, Response } from "express";
import { PollModel } from "../models/index.js";

const getPolls = async (req: Request, res: Response) => {
	const polls = await PollModel.find({});
	return res.json(polls);
};

const createPoll = async (req: Request, res: Response) => {
	const { title, description, createdBy, duration, options } = req.body;

	const poll = new PollModel({ title, description, createdBy, duration, options });

	await poll.save();
	return res.json({ msg: "Ok", poll });
};

export { getPolls, createPoll };
