import { Schema, model } from "mongoose";
import "dotenv/config";

export const RolesAvailableInDB = {
	USER: process.env.USER_ROLE_ID || "",
	ADMIN: process.env.ADMIN_ROLE_ID || "",
	UNREGISTERED: process.env.UNREGISTERED_ROLE_ID || "",
};

const roleSchema = new Schema({
	role: { type: String, required: true },
});

export const RoleModel = model("Role", roleSchema);
