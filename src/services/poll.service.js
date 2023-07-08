import { instanceBackend } from "../interceptors";

const getPollService = async (id) => {
	return await instanceBackend.get(`/poll/${id}`);
};

const getPollsByUserService = async (id) => {
	return await instanceBackend.get(`/poll/user/${id}`);
};

const getPollsAsParticipantService = async (id) => {
	return await instanceBackend.get(`/poll/participant/${id}`);
};

const createPollService = async (data) => {
	return await instanceBackend.post("/poll", data);
};

export { getPollService, getPollsByUserService, createPollService, getPollsAsParticipantService };
