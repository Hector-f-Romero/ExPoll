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

const finishPollService = async (id) => {
	return await instanceBackend.put(`/poll/finish/${id}`);
};

export { getPollService, getPollsByUserService, finishPollService, createPollService, getPollsAsParticipantService };
