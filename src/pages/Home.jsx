import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Input, MODAL_TYPES, showModal } from "../components";
import { loginUserService } from "../services";
import { UserContext } from "../context/UserContext";
import { setTokenAuth } from "../helpers/localStorageManagement";

const Home = () => {
	const { setData } = useContext(UserContext);
	const formWithoutAuth = useForm();
	const formLogin = useForm();
	const navigate = useNavigate();

	const onSubmitWithoutAuth = (data) => {
		console.log(data);
		navigate("/create");
	};

	const onSubmitLogin = async (data) => {
		try {
			const res = await loginUserService(data);
			console.log(res.data);
			setData(res.data);
			// TODO: Define if is required use localStorage to handle the authorization
			setTokenAuth(res.data.token);
			navigate("/history");
		} catch (error) {
			await showModal({
				title: error.response.statusText,
				text: error.response.data.error,
				type: MODAL_TYPES.ERROR,
				confirmText: "Ok",
			});
		}
	};

	return (
		<>
			<div className="bg-[#202938] flex flex-col justify-center items-center py-7 text-white">
				<h1 className="text-5xl sm:text-6xl font-bold animate-fade-up animate-once animate-duration-1000 animate-ease-in-out">
					ExPoll
				</h1>
				<p className="text-lg sm:text-2xl font-regular py-5 animate-fade-up animate-once animate-duration-1000 animate-ease-in-out">
					Create <span className="text-[#e6039c] font-semibold">express polls</span> everywhere
				</p>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 h-[80vh] relative">
				<div className="bg-main-card w-10/12 relative top-8 sm:top-32 h-fit mx-auto px-8 sm:px-14 py-5 sm:py-14 rounded-lg text-[#a7a5a5] animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out">
					<h2 className="text-2xl sm:text-3xl lg:text-4xl mb-5 font-semibold text-center text-white">
						Create a quick poll
					</h2>
					<form onSubmit={formWithoutAuth.handleSubmit(onSubmitWithoutAuth)} className="">
						<Input
							label={"Poll creator"}
							placeholder={"Name"}
							type="text"
							name={"creator"}
							required={{ value: true, message: "Name is required." }}
							minLength={{ value: 3, message: "Name must be between 3 and 10 character." }}
							maxLength={{ value: 10, message: "Name must be between 3 and 10 character." }}
							register={formWithoutAuth.register}
							errors={formWithoutAuth.formState.errors.creator}
						/>
						<button
							type="submit"
							className="w-full px-4 py-2 my-2 text-white font-medium bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button rounded-lg duration-150">
							Join
						</button>
					</form>
				</div>
				<div className="bg-main-card w-10/12 relative top-8 sm:top-32 h-fit mx-auto px-8 sm:px-14 py-5 sm:py-14 rounded-lg text-[#a7a5a5] animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out">
					<h2 className="text-2xl sm:text-3xl lg:text-4xl mb-5 font-semibold text-center text-white">
						Do you want use an account?
					</h2>
					<form onSubmit={formLogin.handleSubmit(onSubmitLogin)} className="text-[#a7a5a5]">
						<Input
							label={"Email"}
							placeholder={"Email"}
							name={"email"}
							type="email"
							required={{ value: true, message: "Email is required." }}
							register={formLogin.register}
							errors={formLogin.formState.errors.email}
						/>
						<Input
							label={"Password"}
							placeholder={"Password"}
							name={"password"}
							type="password"
							required={{ value: true, message: "Password is required." }}
							register={formLogin.register}
							errors={formLogin.formState.errors.password}
						/>
						<button
							type="submit"
							className="w-full px-4 py-2 sm:py-3 my-2 text-white font-medium bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button rounded-lg duration-150">
							Log in
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Home;
