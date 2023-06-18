import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION as string);
		console.log("Database connection established ✔");
	} catch (error) {
		console.log(error);
	}
};
