import { Schema, model } from "mongoose";

const optionSchema = new Schema({
	option: { type: String, required: true },
	numberOfVotes: {
		type: Number,
		default: 0,
		required: false,
	},
});

export const OptionModel = model("Option", optionSchema);
