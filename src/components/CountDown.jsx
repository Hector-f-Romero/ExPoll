import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CountDown = ({ idPoll }) => {
	const [countDown, setCountDown] = useState(null);

	useEffect(() => {
		const eventSource = new EventSource(`${import.meta.env.VITE_BACKEND_URL}/poll/duration/${idPoll}`);
		console.log(eventSource);

		eventSource.onmessage = (event) => {
			// console.log(event.data);
			setCountDown(event.data);
		};

		eventSource.onerror = function () {
			console.log("Client closed");
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, []);

	return <p className="text-2xl sm:text-3xl lg:text-4xl my-5 font-medium text-center">{countDown}</p>;
};

CountDown.propTypes = {
	idPoll: PropTypes.string,
};

export default CountDown;
