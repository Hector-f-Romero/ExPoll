import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Input, NavBar, showModal } from "../components";
import { createUserService } from "../services/user.service";

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		if (data.confirmPassword !== data.password) {
			return await showModal({
				title: "Passwords don't match",
				type: "error",
				text: "The entered passwords don't match. Please try again. ",
				confirmText: "Ok",
			});
		}
		data.role = import.meta.env.VITE_USER_ROLE_ID;
		// console.log(data);
		const res = await createUserService(data);
		console.log(res);
		// TODO: Create user in BD
		await showModal({
			title: "User created correctly",
			type: "success",
			text: "Thanks for register in ExPoll ",
			confirmText: "Ok, let's start",
		});
		navigate("/history", { replace: true });
	};

	return (
		<>
			<NavBar />
			<article className="bg-[#111A21] h-screen flex justify-center items-center overflow-auto">
				<div className="bg-main-card rounded-lg w-5/6 sm:w-3/4 h-fit py-10 px-4 md:px-10 overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-thumb-slate-600 scrollbar-thumb-rounded">
					<h1 className="text-2xl sm:text-4xl lg:text-5xl mb-5 font-semibold text-center">
						Register your data
					</h1>
					<form action="" onSubmit={handleSubmit(onSubmit)}>
						<Input
							label="Names"
							placeholder="Names"
							type="text"
							name="names"
							required={{ value: true, message: "Names is required." }}
							minLength={{ value: 3, message: "Names must be between 3 and 10 character." }}
							maxLength={{ value: 30, message: "Names must be between 3 and 30 character." }}
							register={register}
							errors={errors.names}
						/>
						<Input
							label="Lastnames"
							placeholder="Lastnames"
							type="text"
							name="lastnames"
							required={{ value: true, message: "Lastnames is required." }}
							minLength={{ value: 3, message: "Lastnames must be between 3 and 10 character." }}
							maxLength={{ value: 30, message: "Lastnames must be between 3 and 30 character." }}
							register={register}
							errors={errors.lastnames}
						/>
						<Input
							label="Email"
							placeholder="example@example.com"
							type="email"
							name="email"
							required={{ value: true, message: "Email is required." }}
							minLength={{ value: 3, message: "Email must be between 3 and 10 character." }}
							maxLength={{ value: 254, message: "Email must be between 3 and 30 character." }}
							register={register}
							errors={errors.email}
						/>
						<Input
							label="Password"
							type="password"
							name="password"
							required={{ value: true, message: "Password is required." }}
							minLength={{ value: 3, message: "Password must be between 3 and 10 character." }}
							maxLength={{ value: 15, message: "Password must be between 3 and 15 character." }}
							register={register}
							errors={errors.password}
						/>
						<Input
							label="Confirm password"
							type="password"
							name="confirmPassword"
							required={{ value: true, message: "Password is required." }}
							minLength={{ value: 3, message: "Password must be between 3 and 10 character." }}
							maxLength={{ value: 15, message: "Password must be between 3 and 15 character." }}
							register={register}
							errors={errors.confirmPassword}
						/>
						<div className="flex justify-center items-center">
							<button className=" w-2/4 px-4 py-2 sm:py-3 my-2 text-white font-medium sm:text-xl lg:text-2xl bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button rounded-lg duration-150">
								Register
							</button>
						</div>
					</form>
				</div>
			</article>
		</>
	);
};

export default Register;
