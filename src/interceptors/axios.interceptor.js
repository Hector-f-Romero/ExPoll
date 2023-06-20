import axios from "axios";

export const axiosInterceptor = () => {
	axios.interceptors.request.use((request) => {
		console.log("Starting Request", request);
		return request;
	});
};
