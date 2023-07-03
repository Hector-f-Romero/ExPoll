import { instanceBackend } from "../interceptors";

const getPollService = async (id) => {
	return await instanceBackend.get(`/poll/${id}`);
	// return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/poll/${id}`);
};

const getPollsByUserService = async (id) => {
	return await instanceBackend.get(`/poll/user/${id}`);
};

const createPollService = async (data) => {
	return await instanceBackend.post("/poll", data);
};

export { getPollService, getPollsByUserService, createPollService };
