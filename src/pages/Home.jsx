import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const formWithoutAuth = useForm();
	const formLogin = useForm();
	const navigate = useNavigate();

	const onSubmitWithoutAuth = (data) => {
		console.log(data);
		navigate("/create");
	};

	const onSubmitLogin = (data) => {
		console.log("Log in");
		console.log(data);
		navigate("/create");
	};

	return (
		<div className=" h-screen">
			<div className="bg-[#202938] flex flex-col justify-center items-center h-[20vh] pt-2 text-white">
				<h1 className="text-5xl sm:text-6xl font-bold animate-fade-up animate-once animate-duration-1000 animate-ease-in-out">
					ExPoll
				</h1>
				<p className="text-lg sm:text-2xl font-regular py-5 animate-fade-up animate-once animate-duration-1000 animate-ease-in-out">
					Create <span className="text-[#e6039c] font-semibold">express polls</span> everywhere
				</p>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 bg-[#111A21] h-[80vh] relative">
				<div className="bg-main-card w-10/12 relative top-8 sm:top-32 h-fit mx-auto px-8 sm:px-14 py-5 sm:py-14 rounded-lg text-[#a7a5a5] animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out">
					<h2 className="text-2xl sm:text-3xl lg:text-4xl mb-5 font-semibold text-center text-white">
						Create a quick poll
					</h2>
					<form onSubmit={formWithoutAuth.handleSubmit(onSubmitWithoutAuth)} className="">
						<Input
							label={"Poll creator"}
							placeholder={"Name"}
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
							required={{ value: true, message: "Email is required." }}
							register={formLogin.register}
							errors={formLogin.formState.errors.email}
						/>
						<Input
							label={"Password"}
							placeholder={"Password"}
							name={"password"}
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
		</div>
	);
};

export default Home;
