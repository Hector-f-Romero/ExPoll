import { Response } from "express";
import { MongoServerError } from "mongodb";
import { AlreadyExistInBD, NotFoundInBD } from "./index.js";

export const handleErrorHTTP = (res: Response, error: unknown, HTTPCode?: number, customErrorMessage?: string) => {
	let errorMessage = "";

	// console.log(error);
	if (error instanceof Error) {
		if (error.name === "ValidationError") {
			return res.status(400).json({ error: error.message });
		}
	}

	if (error instanceof MongoServerError) {
		if (error.code === 11000) {
			console.log(error.keyValue);
			errorMessage = `The propierty ${JSON.stringify(error.keyValue)} already exist in BD.`;
			return res.status(409).json({ error: errorMessage });
		}
	}

	if (error instanceof NotFoundInBD) {
		return res.status(404).json({ error: error.message });
	}

	if (error instanceof AlreadyExistInBD) {
		return res.status(409).json({ error: error.message });
	}

	return res.status(500).json(error);
};
