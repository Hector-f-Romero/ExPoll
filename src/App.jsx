import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MonitorPoll, CreatePoll, Home, Register, AnswerPoll, History, AnswerMenu } from "./pages/";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { UserProvider } from "./context";

const App = () => {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create" element={<CreatePoll />} />
					<Route path="/monitor/:id" element={<MonitorPoll />} />
					<Route path="/register" element={<Register />} />
					<Route path="/answer" element={<AnswerMenu />} />
					<Route path="/answer/poll/:id" element={<AnswerPoll />} />

					<Route element={<ProtectedRoutes allowedFor={import.meta.env.VITE_USER_ROLE_ID} />}>
						<Route path="/history" element={<History />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
};

export default App;
