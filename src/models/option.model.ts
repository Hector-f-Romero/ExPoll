import { Schema, model } from "mongoose";

export interface IOption {
	option: string;
	numberOfVotes: Number;
}

const optionSchema = new Schema<IOption>({
	option: { type: String, required: true },
	numberOfVotes: {
		type: Number,
		default: 0,
		required: false,
	},
});

export const OptionModel = model("Option", optionSchema);
