export const formatISODate = (date) => {
	const finishDate = new Date(date);
	return `${includeZeroAtTheBeginning(finishDate.getDate())}/${includeZeroAtTheBeginning(
		finishDate.getMonth()
	)}/${includeZeroAtTheBeginning(finishDate.getFullYear())} ${includeZeroAtTheBeginning(
		finishDate.getHours()
	)}:${includeZeroAtTheBeginning(finishDate.getMinutes())}:${includeZeroAtTheBeginning(finishDate.getSeconds())}`;
};

const includeZeroAtTheBeginning = (value) => {
	if (value < 10) {
		return `0${value}`;
	} else {
		return value;
	}
};
