import { useState } from "react";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const timeToMinutesAndSeconds = (time) => {
	const duration = dayjs.duration(time, "seconds");
	const minutes = duration.minutes();
	const remainingSeconds = duration.seconds();
	return `${minutes}:${remainingSeconds === 0 ? `0${remainingSeconds}` : remainingSeconds} ${
		minutes >= 1 ? "minutes" : "seconds"
	}`;
};

export const useDurationPoll = () => {
	const [durationPoll, setDurationPoll] = useState(60);
	const [formattedTime, setFormattedTime] = useState(timeToMinutesAndSeconds(durationPoll));

	const handleChange = (e) => {
		setDurationPoll(e.target.value);
		setFormattedTime(timeToMinutesAndSeconds(e.target.value));
	};

	return { durationPoll, handleChange, formattedTime };
};
