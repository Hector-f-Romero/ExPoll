import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

import { CountDown, MODAL_TYPES, NavBar, PollView, SpinnerLoading, showModal, showQRModal } from "../components";
import { finishPollService, getPollService } from "../services/poll.service";
import { formatISODate } from "../helpers/index.js";
import { UserContext } from "../context/UserContext";

const MonitorPoll = () => {
	const { user } = useContext(UserContext);
	const [poll, setPoll] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		const getDataBD = async () => {
			setIsLoading(true);
			const { data } = await getPollService(id);
			console.log(data);
			data.poll.formattedFinishAt = formatISODate(data.poll.finishAt);
			setPoll(data.poll);
			setIsLoading(false);
		};
		getDataBD();
	}, []);

	const finishPoll = async () => {
		const res = await finishPollService(poll?.id);
		console.log(res);
	};

	const showFinishButton = () => {
		// 1. Verify if the user is the creator of the poll
		if (user.id !== poll.createdBy._id) {
			return null;
		}

		// 2. Verify if the user is logged in
		if (user.id === "") {
			return null;
		}

		if (poll.completed) {
			return null;
		}

		return (
			<div className="flex justify-center items-center">
				<button
					onClick={finishPoll}
					className="w-2/4 px-4 py-2 sm:py-3 my-2 text-white font-medium sm:text-xl lg:text-2xl bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button rounded-lg duration-150">
					Finish
				</button>
			</div>
		);
	};

	if (isLoading || poll === null) {
		return <SpinnerLoading />;
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
							<CountDown poll={poll} setPoll={setPoll} />
							<p className="text-2xl sm:text-3xl lg:text-4xl my-5 font-medium">{poll?.title}</p>
							<p className="my-2 text-base lg:text-base font-normal">{poll?.description}</p>
							<p className="my-2 text-base lg:text-base font-normal">
								Created by:{" "}
								{poll?.createdBy?.names === "Unregistered"
									? "Unregistered user"
									: `${poll?.createdBy?.names} ${poll?.createdBy?.lastnames}`}
							</p>
							<p className="my-2 text-base lg:text-base font-normal">
								Ends at: {poll?.formattedFinishAt}
							</p>
							<p className="my-2 text-base lg:text-base font-normal">Total votes: {poll?.totalVotes}</p>
							{poll?.completed === true ? null : (
								<div className="flex flex-col justify-center items-center">
									<p className="text-lg sm:text-lg lg:text-lg my-5 font-medium">
										Vote with this QR code
									</p>
									<div
										className="flex flex-col items-center justify-center cursor-pointer"
										onClick={async () =>
											await showQRModal(
												`${import.meta.env.VITE_FRONTEND_URL}/answer/poll/${poll?.id}`
											)
										}>
										<QRCodeSVG value={`http://localhost:5173/answer/poll/${poll?.id}`} size={160} />
									</div>
									<button
										onClick={async () => {
											navigator.clipboard.writeText(
												`http://localhost:5173/answer/poll/${poll?.id}`
											);

											await showModal({
												title: "Copy link",
												type: MODAL_TYPES.SUCCESS,
												confirmText: "Ok",
											});
										}}
										className="w-2/4 sm:w-1/4 px-2 py-2 sm:py-3 mt-5 mb-2 font-medium sm:text-sm lg:text-md border-primary-button border-2 text-primary-button hover:text-hover-primary-button hover:border-hover-primary-button active:border-hover-primary-button rounded-lg duration-150">
										Share answer link
									</button>
								</div>
							)}
							{showFinishButton()}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MonitorPoll;
