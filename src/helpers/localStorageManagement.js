export const setTokenAuth = (token) => {
	localStorage.setItem("auth", token);
};

export const getTokenAuth = () => {
	return localStorage.getItem("auth");
};

export const removeGetTokenAuth = () => {
	localStorage.removeItem("auth");
};
