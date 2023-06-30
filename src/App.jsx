import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MonitorPoll, CreatePoll, Home, Register, AnswerPoll } from "./pages/";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/create" element={<CreatePoll />} />
				<Route path="/monitor/:id" element={<MonitorPoll />} />
				<Route path="/register" element={<Register />} />
				<Route path="/answer/poll/:id" element={<AnswerPoll />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
