import PropTypes from "prop-types";
import { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoutes = ({ children, allowedFor }) => {
	const { user } = useContext(UserContext);

	if (!user) {
		return <Navigate to={"/"} replace />;
	}

	if (user.role !== allowedFor) {
		return <Navigate to={"/"} replace />;
	}

	return children ? children : <Outlet />;
};

ProtectedRoutes.propTypes = {
	children: PropTypes.any,
	allowedFor: PropTypes.string,
};

export default ProtectedRoutes;
