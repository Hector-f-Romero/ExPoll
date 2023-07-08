import { createContext } from "react";
import PropTypes from "prop-types";
import { useUser } from "../hooks/useUser";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const { user, setData, clearData } = useUser();

	return <UserContext.Provider value={{ user, setData, clearData }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
	children: PropTypes.any,
};
