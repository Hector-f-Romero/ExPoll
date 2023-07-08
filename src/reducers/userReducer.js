export const UserReducer = (initialState, action) => {
	switch (action.type) {
		case "SET_DATA":
			return {
				id: action.payload.id,
				role: action.payload.role,
				token: action.payload.token,
			};
		case "SET_ROLE":
			return action.payload;
		case "CLEAR_DATA":
			return {
				id: "",
				role: "",
				token: "",
			};
		default:
			throw new Error("The action has not been specified.");
	}
};

export const TypesUserReducer = Object.freeze({
	SET_DATA: "SET_DATA",
	CLEAR_DATA: "CLEAR_DATA",
});
