import { Schema } from "express-validator";

const verifyDuplicatedValuesInArray = (array: string[]) => {
	const existRepeatedOptions = new Set(array).size !== array.length;
	if (existRepeatedOptions) {
		throw new Error("'Options' key contain repeated id values.");
	} else {
		return true;
	}
};

const createPollValidation: Schema = {
	title: {
		notEmpty: {
			errorMessage: "Title cannot be empty.",
		},
		isLength: {
			options: {
				min: 3,
				max: 50,
			},
			errorMessage: "Poll title must be between 3 and 50 character.",
		},
	},
	description: {
		notEmpty: {
			errorMessage: "Description cannot be empty.",
		},
		isLength: {
			options: {
				min: 3,
				max: 500,
			},
			errorMessage: "Poll description must be between 3 and 500 character.",
		},
	},
	createdBy: {
		notEmpty: {
			errorMessage: "CreatedBy cannot be empty.",
		},
		isMongoId: {
			errorMessage: "Invalid id.",
		},
	},
	duration: {
		notEmpty: {
			errorMessage: "Duration cannot be empty.",
		},
		isInt: {
			errorMessage: "Duration must be a number between 30 (30 seconds) and 300 (5 minutes).",
			options: {
				min: 30,
				max: 300,
			},
		},
	},
	options: {
		notEmpty: {
			errorMessage: "Options cannot be empty.",
		},
		isArray: {
			bail: true,
			options: {
				min: 1,
				max: 6,
			},
			errorMessage: "The poll have to between 1 and 6 options.",
		},
		custom: {
			// Verify that don't exist repeated options
			options: (value: string[]) => verifyDuplicatedValuesInArray(value),
		},
	},
	"options.*": {
		isMongoId: {
			errorMessage: "Invalid option id.",
		},
	},
	verified: {
		notEmpty: {
			errorMessage: "Verified cannot be empty.",
		},
		isBoolean: {
			errorMessage: "Verified must be a boolean.",
		},
	},
};

const updatePollValidation: Schema = {
	title: {
		isLength: {
			options: {
				min: 3,
				max: 50,
			},
			errorMessage: "Poll title must be between 3 and 50 character.",
		},
		optional: true,
	},
	description: {
		isLength: {
			options: {
				min: 3,
				max: 500,
			},
			errorMessage: "Poll description must be between 3 and 500 character.",
		},
		optional: true,
	},
	createdBy: {
		isMongoId: {
			errorMessage: "Invalid id.",
		},
		optional: true,
	},
	duration: {
		isInt: {
			errorMessage: "Duration must be a number between 30 (30 seconds) and 300 (5 minutes).",
			options: {
				min: 30,
				max: 300,
			},
		},
		optional: true,
	},
	options: {
		isArray: {
			bail: true,
			options: {
				min: 1,
				max: 6,
			},
			errorMessage: "The poll have to between 1 and 6 options.",
		},
		custom: {
			// Verify that don't exist repeated options
			options: (value: string[]) => verifyDuplicatedValuesInArray(value),
		},
		optional: true,
	},
	"options.*": {
		isMongoId: {
			errorMessage: "Invalid option id.",
		},
	},
	verified: {
		isBoolean: {
			errorMessage: "Verified must be a boolean.",
		},
		optional: true,
	},
};

export { createPollValidation, updatePollValidation };
