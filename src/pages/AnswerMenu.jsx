import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Input, MODAL_TYPES, NavBar, showModal } from "../components";
import { getPollService } from "../services/poll.service";

const AnswerMenu = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({});
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			console.log(data);
			const res = await getPollService(data.poll);
			if (res.status === 200) {
				navigate(`/answer/poll/${res.data.poll.id}`);
			} else {
				throw new Error("Don't exist poll");
			}
		} catch (error) {
			console.log(error);
			await showModal({
				title: "Error",
				text: error.response.data.error,
				type: MODAL_TYPES.ERROR,
				confirmText: "Ok",
			});
		}
	};

	return (
		<>
			<NavBar />
			<div className="flex justify-center items-center h-screen">
				<div className="bg-main-card w-10/12 h-fit m-auto py-6 rounded-lg text-[#a7a5a5] animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in-out">
					<h2 className="text-lg sm:text-xl lg:text-2xl mb-5 font-semibold text-center text-white">
						Need an express vote?
					</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mx-auto w-3/4">
							<Input
								label={"Poll code"}
								placeholder={"XXXXXXXX"}
								type="text"
								name={"poll"}
								required={{ value: true, message: "Poll code cannot be empty." }}
								minLength={{ value: 24, message: "The poll codes have to 24 charaters." }}
								maxLength={{ value: 24, message: "The poll codes have to 24 charaters." }}
								register={register}
								errors={errors.poll}
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
		</>
	);
};

export default AnswerMenu;
