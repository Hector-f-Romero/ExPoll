import { Schema, model } from "mongoose";

const roleSchema = new Schema({
	role: { type: String, required: true },
});

export const RoleModel = model("Role", roleSchema);
