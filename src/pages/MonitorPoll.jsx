import { useEffect, useState } from "react";
import { CountDown, NavBar, PollView } from "../components";
import { getPollService } from "../services/poll.service";
import { useParams } from "react-router-dom";
import { formatISODate } from "../helpers/index.js";

const MonitorPoll = () => {
	const [poll, setPoll] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		const getDataBD = async () => {
			setIsLoading(true);
			const { data } = await getPollService(id);
			data.formattedFinishAt = formatISODate(data.finishAt);
			console.log(data);
			setPoll(data);
			setIsLoading(false);
		};
		getDataBD();
	}, []);

	if (isLoading || poll === null) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<NavBar />
			<div className="flex items-center justify-center h-screen flex-wrap">
				<div className="bg-main-card w-11/12 my-5">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl my-7 font-bold text-center">Monitoring poll</h1>
					<div className="flex flex-col lg:flex-row">
						<div className="bg-[#243140] flex justify-center items-center p-4 basis-full rounded-none lg:rounded-lg lg:rounded-br-none">
							<PollView poll={poll} setPoll={setPoll} />
						</div>
						<div className="p-5 basis-3/4">
							<CountDown poll={poll} />
							<p className="text-2xl sm:text-3xl lg:text-4xl my-5 font-medium">{poll?.title}</p>
							<p className="my-2 text-base lg:text-base font-normal">{poll?.description}</p>
							<p className="my-2 text-base lg:text-base font-normal">Created by: Test1</p>
							<p className="my-2 text-base lg:text-base font-normal">
								Ends at: {poll?.formattedFinishAt}
							</p>
							<p className="my-2 text-base lg:text-base font-normal">Total votes: 7</p>
							<div className="flex justify-center items-center">
								<button className=" w-2/4 px-4 py-2 sm:py-3 my-2 text-white font-medium sm:text-xl lg:text-2xl bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button rounded-lg duration-150">
									Finish
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MonitorPoll;
