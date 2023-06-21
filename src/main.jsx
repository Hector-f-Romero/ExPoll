import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import { axiosInterceptor } from "./interceptors/axios.interceptor";
import Home from "./pages/Home.jsx";
import CreatePoll from "./pages/CreatePoll";
import { MonitorPoll } from "./pages/MonitorPoll";

axiosInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/create" element={<CreatePoll />} />
				<Route path="/monitor/:id" element={<MonitorPoll />} />
			</Routes>
		</BrowserRouter>
	</>
);
