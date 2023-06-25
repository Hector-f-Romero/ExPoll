import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const CountDown = ({ time }) => {
	const [countDown, setCountDown] = useState(time);
	// const timerId = useRef();

	useEffect(() => {
		const eventSource = new EventSource("http://localhost:4000/api/v1/poll/sse");
		console.log(eventSource);

		eventSource.onmessage = (event) => {
			// console.log(event);
			// const data = JSON.parse(event.data);
			console.log(event.data);
			setCountDown(event.data);
		};

		eventSource.onerror = function () {
			console.log("Client closed");
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};

		// timerId.current = setInterval(() => {
		// 	setCountDown((prev) => prev - 1);
		// }, 1000);

		// return () => {
		// 	clearInterval(timerId.current);
		// };
	}, []);

	// useEffect(() => {
	// 	if (countDown <= 0) {
	// 		clearInterval(timerId.current);
	// 		//TODO: notify to client that poll finished.
	// 	}
	// }, [countDown]);

	return <p className="text-2xl sm:text-3xl lg:text-4xl my-5 font-medium text-center">{countDown}</p>;
};

CountDown.propTypes = {
	time: PropTypes.number.isRequired,
};

export default CountDown;
