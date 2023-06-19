import { Response } from "express";
import { MongoServerError } from "mongodb";

export const handleErrorHTTP = (res: Response, error: unknown, HTTPCode: number, customErrorMessage?: string) => {
	let errorMessage = "";

	// console.log(error);
	if (error instanceof MongoServerError) {
		if (error.code === 11000) {
			console.log(error.keyValue);
			errorMessage = `The propierty ${JSON.stringify(error.keyValue)} already exist in BD.`;
		}
	}
	return res.status(HTTPCode).json({ error: errorMessage });
};
