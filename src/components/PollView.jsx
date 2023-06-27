import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.color = "#fff";

const PollView = ({ data }) => {
	const pollData = {
		labels: data?.options?.map((option) => option.option),
		// labels: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6"],
		datasets: [
			{
				label: "Dataset1",
				data: data?.options?.map((option) => option.numberOfVotes),
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
				text: data?.title,
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
	return <Bar options={pollOptions} data={pollData} plugins={[ChartDataLabels]} />;
};

PollView.propTypes = {
	data: PropTypes.object,
};

export default PollView;
