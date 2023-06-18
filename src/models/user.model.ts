import { Schema, model } from "mongoose";

const userSchema = new Schema({
	names: { type: String, required: true },
	lastnames: { type: String, required: true },
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Role",
	},
	polls: [
		{
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Poll",
		},
	],
});

export const UserModel = model("User", userSchema);
