import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./db/mongo.config.js";
import { socketController } from "./sockets/index.js";
import { authRouter, optionRouter, pollRouter, roleRouter, userRouter } from "./routes";

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
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/v1/poll", pollRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/option", optionRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/role", roleRouter);

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
