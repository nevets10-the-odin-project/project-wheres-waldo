import React from "react";
import App from "./components/App";
import ErrorPage from "./components/errorPage/ErrorPage";
import Images from "./components/images/Images";
import Leaderboard from "./components/leaderboard/Leaderboard";

const routes = [
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/images/:id?",
		element: <Images />,
	},
	{
		path: "/leaderboard",
		element: <Leaderboard />,
	},
];

export default routes;
