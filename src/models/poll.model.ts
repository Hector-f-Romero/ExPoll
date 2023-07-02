import { Document, Schema, model } from "mongoose";
import { IOption } from "./option.model";
import { IUser } from "./user.model";

export interface IPoll extends Document {
	title: string;
	description: string;
	createdBy: IUser;
	duration: number;
	finishAt: Date;
	completed: boolean;
	verified: boolean;
	options: IOption[];
	createdAt: Date;
}

const pollSchema = new Schema<IPoll>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		createdBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		duration: {
			type: Number,
			required: true,
		},
		finishAt: {
			type: Date,
			required: false,
		},
		completed: {
			type: Boolean,
			default: false,
			required: false,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		options: [
			{
				type: Schema.Types.ObjectId,
				required: true,
				ref: "Option",
			},
		],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

pollSchema.virtual("totalVotes").get(function () {
	const totalVotes: number[] = this.options.map((option: IOption) => {
		if (!option.voters) {
			return 0;
		} else {
			return option.voters.length;
		}
	});
	// Sum the length of each option to return the total number of votes
	return totalVotes.reduce((a: number, b: number) => a + b, 0);
});

pollSchema.methods.toJSON = function () {
	const { __v, _id, ...poll } = this.toObject();
	poll.id = _id;
	return poll;
};

export const PollModel = model("Poll", pollSchema);
