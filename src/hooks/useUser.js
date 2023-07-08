import { useReducer } from "react";

import { TypesUserReducer, UserReducer } from "../reducers/userReducer";

const initialState = {
	id: "",
	role: "",
	token: "",
};

export const useUser = () => {
	const [user, dispatchUser] = useReducer(UserReducer, initialState);

	const setData = (data) => {
		dispatchUser({
			type: TypesUserReducer.SET_DATA,
			payload: data,
		});
	};

	const clearData = () => {
		dispatchUser({
			type: TypesUserReducer.CLEAR_DATA,
		});
	};

	return { user, setData, clearData };
};
