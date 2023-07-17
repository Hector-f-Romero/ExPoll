import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";

import { getPollService } from "../services/poll.service";
import { CountDown, MODAL_TYPES, NavBar, SpinnerLoading, showModal } from "../components";
import { voteOptionService } from "../services/option.service";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);
let canVote = true;

const AnswerPoll = () => {
	const [poll, setPoll] = useState(null);
	const { user } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	useEffect(() => {
		const getDatBD = async () => {
			setIsLoading(true);
			const { data } = await getPollService(id);
			console.log(data.poll.options);
			data.poll.options.forEach((option) => {
				const userAlreadyVoted = option.voters.find((voter) => voter._id === user.id);
				if (userAlreadyVoted && user.id !== import.meta.env.VITE_UNREGISTERED_VOTER_USER_ID) {
					console.log("Usuario ya votó");
					canVote = false;
				}
			});
			console.log(user);
			setPoll(data.poll);
			setIsLoading(false);
		};
		getDatBD();

		return () => {
			socket.disconnect();
		};
	}, [socket]);

	const onSubmit = async (data) => {
		data.idVoter = user.id !== "" ? user.id : `${import.meta.env.VITE_UNREGISTERED_CREATOR_USER_ID}`;
		data.pollId = poll.id;
		const res = await voteOptionService(data);
		socket.emit("vote", { id: poll.id });
		if (res.status === 201) {
			await showModal({
				title: "Vote sent",
				text: "Your vote has been saved successfully",
				type: MODAL_TYPES.SUCCESS,
				confirmText: "Ok, view the results",
			});
			navigate(`/monitor/${poll.id}`, { replace: true });
		}
	};

	if (isLoading || poll === null) {
		return <SpinnerLoading />;
	}

	return (
		<>
			<NavBar />
			<div className="flex items-center justify-center h-screen flex-wrap ">
				<div className="bg-main-card w-11/12 lg:w-2/3 h-11/12 lg:2/3 rounded-lg px-7 py-3">
					{!isLoading && <CountDown poll={poll} setPoll={setPoll} />}
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">{poll?.title}</h1>
					<h1 className="my-2 text-lg sm:text-xl lg:text-2xl font-semibold text-center">
						ID code: {poll?.id}
					</h1>
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
								disabled={poll?.completed || canVote == false ? true : false}
								className={`w-3/4 px-4 py-2 my-2 text-white font-medium ${
									poll?.completed || canVote === false
										? "bg-slate-700 cursor-not-allowed"
										: "bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button"
								}   rounded-lg duration-150`}>
								Vote
							</button>
						</div>
					</form>
				</div>
			</div>{" "}
		</>
	);
};

export default AnswerPoll;