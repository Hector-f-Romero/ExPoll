import { instanceBackend } from "../interceptors";

const getUserService = async (id) => {
	return await instanceBackend.get(`/user/${id}`);
};

const createUserService = async (data) => {
	return await instanceBackend.post("/user", data);
};

export { getUserService, createUserService };
