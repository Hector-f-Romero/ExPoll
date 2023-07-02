import axios from "axios";

export const instanceBackend = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const axiosInterceptor = () => {
	instanceBackend.interceptors.request.use((request) => {
		// console.log("Starting Request", request);
		return request;
	});

	instanceBackend.interceptors.response.use(
		(response) => {
			// console.log("Response", response);
			return response;
		},
		(error) => {
			// console.log("Error", error);
			if (error.code === "ERR_BAD_REQUEST") {
				return Promise.reject(error.response.data.error);
			}
			return Promise.reject(error);
		}
	);
};
