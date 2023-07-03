import { useState } from "react";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const links = [
	{ id: 1, name: "Home", link: "/" },
	{ id: 2, name: "Create", link: "/create" },
	{ id: 3, name: "History", link: "/history" },
	{ id: 4, name: "Login", link: "/" },
];

const NavBar = () => {
	const [open, setOpen] = useState(false);
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
							{links.map((link) => (
								<NavLink
									to={link.link}
									key={link.id}
									className="text-white hover:text-blue-400 duration-500">
									{link.name}
								</NavLink>
							))}
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
