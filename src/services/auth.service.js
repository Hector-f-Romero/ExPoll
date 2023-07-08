import { instanceBackend } from "../interceptors";

const loginUserService = async (data) => {
	return await instanceBackend.post(`/auth/login`, data);
};

export { loginUserService };
