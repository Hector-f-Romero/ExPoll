import { Schema, model } from "mongoose";

const pollSchema = new Schema(
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
		participants: [
			{
				type: Schema.Types.ObjectId,
				required: true,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

pollSchema.methods.toJSON = function () {
	const { __v, _id, ...poll } = this.toObject();
	poll.id = _id;
	return poll;
};

export const PollModel = model("Poll", pollSchema);
