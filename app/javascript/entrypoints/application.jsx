import React from "react";
import Client from "react-dom/client";
import App from "../components/App.jsx";

Client.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
