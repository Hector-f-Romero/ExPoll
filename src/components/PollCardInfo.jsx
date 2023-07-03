import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { formatISODate } from "../helpers";

const PollCardInfo = ({ data }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate(`/monitor/${data?.id}`)}
			className="bg-main-card rounded-md p-5 relative cursor-pointer">
			<p className="my-2 text-xl sm:text-3xl lg:text-4xl font-semibold">{data?.title}</p>
			<div className="flex flex-row absolute top-8 right-6 gap-2 items-center">
				<p className="text-sm sm:text-lg lg:text-xl font-normal">
					{data?.completed ? "Finished" : "In progress"}
				</p>
				<div
					className={`w-5 h-5 sm:w-8 sm:h-8 ${
						data?.completed ? "bg-red-600" : "bg-green-500 animate-pulse"
					} rounded-full`}></div>
			</div>
			<hr className="border rounded" />
			<p className="my-2 text-sm sm:text-lg lg:text-xl font-light">
				Created by: {data?.createdBy?.names} {data?.createdBy?.lastnames}
			</p>
			<p className="my-2 text-sm sm:text-lg lg:text-xl font-light">Finish at: {formatISODate(data?.finishAt)}</p>
			<p className="my-2 text-sm sm:text-lg lg:text-xl font-light">
				Available options:
				{data?.options.map((option) => (
					<span key={option._id}> &bull; {option?.option}</span>
				))}
			</p>

			<p className="my-2 text-sm sm:text-lg lg:text-xl font-light">Total votes: {data?.totalVotes}</p>
		</div>
	);
};

PollCardInfo.propTypes = {
	data: PropTypes.object,
};

export default PollCardInfo;
