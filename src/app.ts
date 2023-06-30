import express from "express";
import "dotenv/config";
import cors from "cors";

import { connectDB } from "./db/mongo.config.js";
import pollRoutes from "./routes/poll.routes.js";
import userRoutes from "./routes/user.routes.js";
import optionRoutes from "./routes/option.routes.js";

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/v1/poll", pollRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/option", optionRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
