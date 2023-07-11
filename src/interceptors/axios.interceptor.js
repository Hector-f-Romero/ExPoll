import axios from "axios";
import { getTokenAuth } from "../helpers/localStorageManagement";

export const instanceBackend = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	headers: {
		Authorization: `Bearer ${getTokenAuth()}`,
	},
});

export const axiosInterceptor = () => {
	instanceBackend.interceptors.request.use((request) => {
		// const cookies = Cookies();
		// console.log(cookies);
		console.log("Starting Request", request);
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
				return Promise.reject(error);
			}
			return Promise.reject(error);
		}
	);
};
