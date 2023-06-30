import { Schema, model } from "mongoose";
import { IUser } from "./user.model";

export interface IOption {
	option: string;
	voters: IUser[];
}

const optionSchema = new Schema<IOption>(
	{
		option: { type: String, required: true },
		voters: [
			{
				type: Schema.Types.ObjectId,
				required: false,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

optionSchema.methods.toJSON = function () {
	const { __v, _id, ...option } = this.toObject();
	option.id = _id;
	return option;
};

export const OptionModel = model("Option", optionSchema);
