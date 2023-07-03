import { useEffect, useState } from "react";

import { NavBar, PollCardInfo, SpinnerLoading } from "../components";
import { getPollsByUserService } from "../services/poll.service";

const History = () => {
	const [polls, setPolls] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getDataBD = async () => {
			setIsLoading(true);
			const { data } = await getPollsByUserService("64a3183e45e8fc35b91d3577");
			console.log(data);
			setPolls(data);
			setIsLoading(false);
		};
		getDataBD();
	}, []);

	if (isLoading || polls === null) {
		return <SpinnerLoading />;
	}

	return (
		<div className="flex flex-col h-screen">
			<NavBar />
			<div className="w-full grow mt-[64px] ">
				<h1 className="my-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-center cursor-pointer">
					Poll history
				</h1>
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
