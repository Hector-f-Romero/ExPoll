import { instanceBackend } from "./instance";

const createPollService = async (data) => {
	return await instanceBackend.post("/poll", data);
};

export { createPollService };
