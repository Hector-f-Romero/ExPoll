import { Response } from "express";
import { MongoServerError } from "mongodb";
import { AlreadyExistInBD, NotFoundInBD } from "./index.js";

export const handleErrorHTTP = (res: Response, error: unknown, HTTPCode?: number, customErrorMessage?: string) => {
	let errorMessage = "";
	console.log(error);

	if (error instanceof Error) {
		console.log(error.name);
		if (error.name === "ValidationError") {
			return res.status(400).json({ error: error.message });
		}

		if (error.name === "JWSSignatureVerificationFailed") {
			return res.status(400).json({ error: `Token error: ${error.message}` });
		}

		if (error.name === "JWTExpired") {
			return res.status(400).json({ error: `The token has expired` });
		}

		// if(error.name === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED")

		return res.status(500).json({ error: error.message });
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
