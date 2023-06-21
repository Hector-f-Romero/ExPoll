import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MonitorPoll, CreatePoll, Home } from "./pages/";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/create" element={<CreatePoll />} />
				<Route path="/monitor/:id" element={<MonitorPoll />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
