import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./db/mongo.config.js";
import pollRoutes from "./routes/poll.routes.js";
import userRoutes from "./routes/user.routes.js";
import optionRoutes from "./routes/option.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { socketController } from "./sockets/index.js";

// Initialize the server config
const app = express();
const PORT = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});
io.on("connection", (socket) => socketController(socket, io));

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1/poll", pollRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/option", optionRoutes);
app.use("/api/v1/auth", authRoutes);

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
