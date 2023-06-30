import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPollService } from "../services/poll.service";
import { CountDown, SpinnerLoading } from "../components";
import { useForm } from "react-hook-form";
import { voteOptionService } from "../services/option.service";

const AnswerPoll = () => {
	const [poll, setPoll] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();
	const { register, handleSubmit } = useForm();

	useEffect(() => {
		const getDatBD = async () => {
			setIsLoading(true);
			const { data } = await getPollService(id);
			console.log(data);
			setPoll(data);
			setIsLoading(false);
		};
		getDatBD();
	}, []);

	const onSubmit = async (data) => {
		console.log(poll);

		data.idVoter = import.meta.env.VITE_UNREGISTERED_VOTER_USER_ID;
		data.pollId = poll.id;
		console.log(data);
		const res = await voteOptionService(data);
		console.log(res);
	};

	if (isLoading || poll === null) {
		return <SpinnerLoading />;
	}

	return (
		<div className="flex items-center justify-center h-screen flex-wrap ">
			<div className="bg-main-card w-11/12 h-11/12 rounded-lg px-7 py-3">
				{!isLoading && <CountDown poll={poll} setPoll={setPoll} />}
				<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">{poll?.title}</h1>
				<h1 className="my-2 text-lg sm:text-xl lg:text-2xl font-semibold text-center">ID code: {poll?.id}</h1>
				<p className="font-medium text-sm md:text-xl">Poll description</p>
				<p className="my-2 text-base lg:text-base font-normal">{poll?.description}</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="optionChoosen" className="font-medium text-sm md:text-xl">
						Select an option
					</label>
					<select
						name="optionChoosen"
						{...register("option")}
						className="text-sm rounded-lg my-2  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
						{poll?.options?.map((option) => (
							<option value={option?._id} key={option?._id}>
								{option?.option}
							</option>
						))}
					</select>
					<div className="flex justify-center items-center">
						<button
							type="submit"
							// disabled={poll?.completed}
							className={`w-3/4 px-4 py-2 my-2 text-white font-medium ${
								poll?.completed
									? "bg-slate-700 cursor-not-allowed"
									: "bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button"
							}   rounded-lg duration-150`}>
							Vote
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AnswerPoll;
