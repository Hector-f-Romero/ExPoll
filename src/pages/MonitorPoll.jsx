import { NavBar, PollView } from "../components";

const MonitorPoll = () => {
	return (
		<>
			<NavBar />
			<div className="flex items-center justify-center h-screen flex-wrap">
				<div className="bg-main-card w-11/12 my-5">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl my-7 font-bold text-center">Monitoring poll</h1>
					<div className="flex flex-col lg:flex-row">
						<div className="bg-[#243140] flex justify-center items-center p-4 basis-full rounded-none lg:rounded-lg lg:rounded-br-none">
							<PollView />
						</div>
						<div className="p-5 basis-3/4">
							<p className="text-2xl sm:text-3xl lg:text-4xl my-5 font-medium text-center">01:34 </p>
							<p className="text-2xl sm:text-3xl lg:text-4xl my-5 font-medium">
								Lorem ipsum odor amet, consectetuer adipiscing elit. Duis proin est semper non varius.
							</p>
							<p className="my-2 text-base lg:text-base font-normal">
								Lorem ipsum odor amet, consectetuer adipiscing elit. Duis proin est semper non varius.
								Ultricies ante convallis fermentum per; elit commodo amet. Auctor ullamcorper imperdiet
								aliquet suspendisse; Lorem ipsum odor amet, consectetuer adipiscing elit. Duis proin est
								semper non varius. Ultricies ante convallis fermentum per; elit commodo amet. Auctor
								ullamcorper imperdiet aliquet suspendisse;
							</p>
							<p className="my-2 text-base lg:text-base font-normal">
								Lorem ipsum odor amet, consectetuer adipiscing elit. Duis proin est semper non varius.
								Ultricies ante convallis fermentum per; elit commodo amet. Auctor ullamcorper imperdiet
								aliquet suspendisse; Lorem ipsum odor amet, consectetuer adipiscing elit. Duis proin est
								semper non varius. Ultricies ante convallis fermentum per; elit commodo amet. Auctor
								ullamcorper imperdiet aliquet suspendisse;
							</p>
							<p className="my-2 text-base lg:text-base font-normal">
								Lorem ipsum odor amet, consectetuer adipiscing elit. Duis proin est semper non varius.
								Ultricies ante convallis fermentum per; elit commodo amet. Auctor ullamcorper imperdiet
								aliquet suspendisse; Lorem ipsum odor amet, consectetuer adipiscing elit. Duis proin est
								semper non varius. Ultricies ante convallis fermentum per; elit commodo amet. Auctor
								ullamcorper imperdiet aliquet suspendisse;
							</p>
							<p className="my-2 text-base lg:text-base font-normal">Created by: Test1</p>
							<p className="my-2 text-base lg:text-base font-normal">Ends at: 20/06/2023 12:05 P.M.</p>
							<p className="my-2 text-base lg:text-base font-normal">Total votes: 7</p>
							<div className="flex justify-center items-center">
								<button className=" w-2/4 px-4 py-2 sm:py-3 my-2 text-white font-medium sm:text-xl lg:text-2xl bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button rounded-lg duration-150">
									Finish
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MonitorPoll;
