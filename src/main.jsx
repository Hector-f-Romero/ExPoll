import ReactDOM from "react-dom/client";

import "./index.css";
import { axiosInterceptor } from "./interceptors/axios.interceptor";
import App from "./App";

axiosInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<App />
	</>
);
