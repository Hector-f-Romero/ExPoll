import { useEffect, useState } from "react";

import { NavBar, PollCardInfo, SpinnerLoading } from "../components";
import { getPollsAsParticipantService, getPollsByUserService } from "../services/poll.service";
import { useContext } from "react";
import { UserContext } from "../context";

let currentView = "";

const History = () => {
	const [polls, setPolls] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [enableButtonParticipant, setEnableButtonParticipant] = useState(false);
	const [enableButtonCreator, setEnableButtonCreator] = useState(true);
	const { user } = useContext(UserContext);

	useEffect(() => {
		getPollsCreated();
	}, []);

	const getPollsCreated = async () => {
		setIsLoading(true);
		const { data } = await getPollsByUserService(user.id);
		console.log(data);
		setPolls(data);
		currentView = "History of polls created";
		setEnableButtonCreator(false);
		setEnableButtonParticipant(true);
		setIsLoading(false);
	};

	const getPollsAsParticipant = async () => {
		setIsLoading(true);

		const { data } = await getPollsAsParticipantService(user.id);
		console.log(data);
		setPolls(data);
		currentView = "History of polls as an participant";
		setEnableButtonCreator(true);
		setEnableButtonParticipant(false);
		setIsLoading(false);
	};

	if (isLoading || polls === null) {
		return <SpinnerLoading />;
	}

	return (
		<div className="flex flex-col h-screen">
			<NavBar />
			<div className="w-full grow mt-[64px] ">
				<h1 className="my-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-center">{currentView}</h1>
				<div className="flex flex-row mx-auto  w-2/4 gap-6 my-4">
					<button
						onClick={() => getPollsCreated()}
						disabled={enableButtonParticipant}
						className={`w-full px-4 py-2 sm:py-3 my-2 text-white font-medium ${
							enableButtonCreator
								? " bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button"
								: "bg-slate-700 cursor-not-allowed"
						}  rounded-lg duration-150`}>
						Poll created
					</button>
					<button
						onClick={() => getPollsAsParticipant()}
						disabled={enableButtonCreator}
						className={`w-full px-4 py-2 sm:py-3 my-2 text-white font-medium ${
							enableButtonParticipant
								? " bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button"
								: "bg-slate-700 cursor-not-allowed"
						} rounded-lg duration-150`}>
						Participated in
					</button>
				</div>
				<div className="flex flex-col mx-auto w-4/5 gap-5">
					{polls?.map((poll) => (
						<PollCardInfo data={poll} key={poll?.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default History;
