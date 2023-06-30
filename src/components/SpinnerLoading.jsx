const SpinnerLoading = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div
				className="animate-spin inline-block w-80 h-80 border-[6px] border-current border-t-transparent text-blue-600 rounded-full"
				role="status"
				aria-label="loading">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};

export default SpinnerLoading;
