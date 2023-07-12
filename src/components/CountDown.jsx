import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getPollService } from "../services/poll.service";
import { formatISODate } from "../helpers";

const CountDown = ({ poll, setPoll }) => {
	const [countDown, setCountDown] = useState("00:00");

	useEffect(() => {
		const eventSource = new EventSource(`${import.meta.env.VITE_BACKEND_URL}/poll/duration/${poll?.id}`);
		// console.log(eventSource);

		eventSource.onmessage = (event) => {
			// console.log(event.data);
			setCountDown(formatSecondsToMinutes(event.data));
		};

		eventSource.addEventListener("finishPoll", (event) => {
			const getUpdatedData = async () => {
				const { data } = await getPollService(poll.id);
				data.poll.formattedFinishAt = formatISODate(data.poll.finishAt);
				setPoll(data.poll);
				setCountDown(event.data);
			};
			getUpdatedData();
		});

		eventSource.onerror = function () {
			// console.log("Client closed");
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, []);

	const formatSecondsToMinutes = (seconds) => {
		// 👇️ get the number of full minutes
		const minutes = Math.floor(seconds / 60);

		// 👇️ get the remainder of the seconds
		const remainingSeconds = seconds % 60;
		return `0${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
	};

	return <p className="text-2xl sm:text-3xl lg:text-4xl my-5 font-medium text-center">{countDown}</p>;
};

CountDown.propTypes = {
	poll: PropTypes.object,
	setPoll: PropTypes.func,
};

export default CountDown;
