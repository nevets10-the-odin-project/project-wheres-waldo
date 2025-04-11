import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routesFile from "../routes.jsx";

const routes = createBrowserRouter(routesFile);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={routes} />
	</StrictMode>
);
