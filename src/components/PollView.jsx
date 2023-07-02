import { useEffect } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.color = "#fff";
const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

const PollView = ({ poll, setPoll }) => {
	const pollData = {
		labels: poll?.options?.map((option) => option.option),
		// labels: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6"],
		datasets: [
			{
				label: "Dataset1",
				data: poll?.options?.map((option) => option.voters.length),
				borderWidth: 1,
				backgroundColor: ["#E31A1C", "#377EB8", "#4DAF4A", "#984EA3", "#FF7F00", "#A65628"],
			},
		],
	};

	const pollOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "false",
			},
			title: {
				display: true,
				text: poll?.title,
				font: function (context) {
					var width = context.chart.width;
					var size = Math.round(width / 32);
					return {
						size: size,
						weight: 500,
					};
				},
			},
			colors: {
				enabled: true,
			},
		},
	};

	useEffect(() => {
		const connectToPollRoom = () => {
			console.log(`Conectado a ${poll.id}`);
			console.log(socket);
			socket.emit("link-poll", { id: poll.id });
		};

		socket.on("totalVotes", (payload) => {
			console.log("Recibiendo datos actualizados");
			console.log(payload);
			setPoll(payload.poll);
		});

		connectToPollRoom();

		return () => {
			console.log("Me desconecté en poll view");
			socket.disconnect();
		};
	}, []);

	return <Bar options={pollOptions} data={pollData} plugins={[ChartDataLabels]} />;
};

PollView.propTypes = {
	poll: PropTypes.object,
	setPoll: PropTypes.any,
};

export default PollView;
