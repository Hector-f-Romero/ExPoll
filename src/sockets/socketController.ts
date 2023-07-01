import { Server, Socket } from "socket.io";
import { PollModel } from "../models/index.js";

export const socketController = (socket: Socket, io: Server) => {
	socket.on("link-poll", (payload: { id: string }) => {
		socket.join(payload.id);
	});

	socket.on("vote", async (payload: { id: string }) => {
		const poll = await PollModel.findById(payload.id).populate([{ path: "options" }]);
		// Updated poll information is sent to the client side through a event called "totalVotes"
		socket.to(payload.id).emit("totalVotes", { poll });
	});
};
