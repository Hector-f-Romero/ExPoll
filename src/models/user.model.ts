import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
	names: string;
	lastnames: string;
	email: string;
	password: string;
	role: Types.ObjectId;
	polls?: [Types.ObjectId];
}

const userSchema = new Schema<IUser>({
	names: { type: String, required: true, minLength: 3, maxlength: 30 },
	lastnames: { type: String, required: true, minLength: 3, maxlength: 30 },
	email: {
		type: String,
		required: true,
		unique: true,
		maxlength: 254,
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
			required: false,
			ref: "Poll",
		},
	],
});

userSchema.methods.toJSON = function () {
	const { __v, _id, password, ...user } = this.toObject();
	user.id = _id;
	return user;
};

// type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("User", userSchema);
