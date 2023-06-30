import { instanceBackend } from "../interceptors";

const voteOptionService = async (data) => {
	return await instanceBackend.post(`option/vote/unregistered/${data.pollId}`, data);
};

export { voteOptionService };
