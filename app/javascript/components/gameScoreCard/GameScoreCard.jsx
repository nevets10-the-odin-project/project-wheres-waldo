import React from "react";
import styles from "./gameScoreCard.module.css";

export default function GameScoreCard({ game, place }) {
	const diff = new Date(game.end_time) - new Date(game.start_time);

	const minutes = Math.floor(diff / (1000 * 60));
	const seconds = Math.floor(diff / 1000) - minutes * 60;

	return (
		<div>
			{place}. {game.initials ? game.initials : "---"}, {minutes}m {seconds}s
		</div>
	);
}
