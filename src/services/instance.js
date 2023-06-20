import axios from "axios";

export const instanceBackend = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
});
