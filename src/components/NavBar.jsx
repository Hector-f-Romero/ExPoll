import { useContext, useState } from "react";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { removeGetTokenAuth } from "../helpers/localStorageManagement";

const NavBar = () => {
	const [open, setOpen] = useState(false);
	const { user, clearData } = useContext(UserContext);

	const linksNoAuthenticatedUser = [
		{ id: 1, name: "Home", link: "/" },
		{ id: 2, name: "Register", link: "/" },
		{ id: 3, name: "Create", link: "/create" },
	];

	const linksAuthenticatedUser = [
		{ id: 1, name: "Create", link: "/create" },
		{ id: 2, name: "History", link: "/history" },
		{
			id: 3,
			name: "Logout",
			link: "/",
			onClick: () => {
				clearData();
				removeGetTokenAuth();
			},
		},
	];

	const showLinks = () => {
		if (!user.token) {
			return linksNoAuthenticatedUser.map((link) => (
				<NavLink
					to={link.link}
					key={link.id}
					onClick={link.onClick}
					className="text-white hover:text-blue-400 duration-500">
					{link.name}
				</NavLink>
			));
		} else {
			return linksAuthenticatedUser.map((link) => (
				<NavLink
					to={link.link}
					key={link.id}
					onClick={link.onClick}
					className="text-white hover:text-blue-400 duration-500">
					{link.name}
				</NavLink>
			));
		}
	};

	return (
		<header>
			<nav className="shadow-md w-full top-0 left-0 fixed z-50">
				<div className="md:flex items-center justify-between bg-[#243140] py-4 md:px-10 px-7 ">
					<span className="font-bold text-2xl cursor-pointer flex items-center gap-1">ExPoll</span>
					<div
						onClick={() => setOpen(!open)}
						className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7">
						{open ? <FiX /> : <FiAlignJustify />}
					</div>
					<ul
						className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#243140] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
							open ? "top-12 z-10" : "top-[-190px] z-10"
						}`}>
						<li className="flex flex-col gap-6 md:flex-row md:ml-8 md:my-0 my-7 font-semibold">
							{showLinks()}
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
