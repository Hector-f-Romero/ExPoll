import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Input, MODAL_TYPES, showModal } from "../components";
import { getPollService, loginUserService } from "../services";
import { UserContext } from "../context/UserContext";
import { setTokenAuth } from "../helpers/localStorageManagement";

const Home = () => {
	const { setData } = useContext(UserContext);
	const formWithoutAuth = useForm();
	const formLogin = useForm();
	const navigate = useNavigate();

	const onSubmitWithoutAuth = async (data) => {
		try {
			const res = await getPollService(data.poll);
			navigate(`/answer/poll/${res.data.poll.id}`);
		} catch (error) {
			console.log(error);
			if (error.response.status === 400) {
				await showModal({
					title: "Error",
					text: error.response.data.error.id.msg,
					type: MODAL_TYPES.ERROR,
					confirmText: "OK",
				});
			} else {
				await showModal({
					title: "Error",
					text: error.response.data.error,
					type: MODAL_TYPES.ERROR,
					confirmText: "OK",
				});
			}
		}
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
			<div className="bg-[#202938] flex flex-col justify-center items-center py-7 text-white h-[25vh]">
				<h1 className="text-5xl sm:text-6xl font-bold animate-fade-up animate-once animate-duration-1000 animate-ease-in-out">
					ExPoll
				</h1>
				<p className="text-lg sm:text-2xl font-regular py-5 animate-fade-up animate-once animate-duration-1000 animate-ease-in-out">
					Create <span className="text-[#e6039c] font-semibold">express polls</span> everywhere
				</p>
			</div>
			<div className="grid gap-5 sm:gap-0 grid-cols-1 sm:grid-cols-2 h-[75vh] ">
				<div className="flex flex-col mt-7 sm:mt-0 gap-5 sm:gap-0">
					<div className="bg-main-card w-10/12 h-fit m-auto py-6 rounded-lg text-[#a7a5a5] animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out">
						<h2 className="text-lg sm:text-xl lg:text-2xl mb-5 font-semibold text-center text-white">
							Need an express poll?
						</h2>
						<div className="flex justify-center items-center">
							<button
								type="submit"
								onClick={() => navigate("/create")}
								className="w-2/4 px-4 py-2 my-2 text-white font-medium text-sm sm:text-base bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button rounded-lg duration-150">
								Quickly create one!
							</button>
						</div>
					</div>
					<div className="bg-main-card w-10/12 h-fit m-auto py-6 rounded-lg text-[#a7a5a5] animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out">
						<h2 className="text-lg sm:text-xl lg:text-2xl mb-5 font-semibold text-center text-white">
							Need an express vote?
						</h2>
						<form onSubmit={formWithoutAuth.handleSubmit(onSubmitWithoutAuth)}>
							<div className="mx-auto w-3/4">
								<Input
									label={"Poll code"}
									placeholder={"XXXXXXXX"}
									type="text"
									name={"poll"}
									required={{ value: true, message: "Poll code cannot be empty." }}
									minLength={{ value: 24, message: "The poll codes have to 24 charaters." }}
									maxLength={{ value: 24, message: "The poll codes have to 24 charaters." }}
									register={formWithoutAuth.register}
									errors={formWithoutAuth.formState.errors.poll}
								/>
							</div>
							<div className="flex justify-center items-center">
								<button
									type="submit"
									className="w-2/4 px-4 py-2 my-2 text-white font-medium text-sm sm:text-base bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button rounded-lg duration-150">
									Enter the code and vote
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="bg-main-card w-10/12 h-fit m-auto px-8 sm:px-14 py-5 sm:py-14 rounded-lg text-[#a7a5a5] animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out">
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
							className="w-full px-4 py-2 sm:py-3 my-2 text-sm sm:text-base text-white font-medium bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button rounded-lg duration-150">
							Log in
						</button>
					</form>
					<h2 className="text-xs sm:text-sm lg:text-base mb-5 font-light text-center text-white">
						Don&apos;t have an account?{" "}
						<span onClick={() => navigate("/register")} className="font-semibold cursor-pointer">
							Sign up here
						</span>
					</h2>
				</div>
			</div>
		</>
	);
};

export default Home;
