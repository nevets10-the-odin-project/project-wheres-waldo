import React from "react";
import styles from "./imageLeaderboard.module.css";
import GameScoreCard from "../gameScoreCard/GameScoreCard";

function compareGames(g1, g2) {
	const diff1 = new Date(g1.end_time) - new Date(g1.start_time);
	const diff2 = new Date(g2.end_time) - new Date(g2.start_time);
	return diff1 - diff2;
}

export default function ImageLeaderboard({ image }) {
	const finishedGames = image.games.filter((game) => game.end_time != null);
	const sortedGames = finishedGames.toSorted(compareGames);

	return (
		<div className={styles.wrapper}>
			<div className={styles.leaderboard}>
				<h2>{image.name}</h2>
				{sortedGames?.map((game, index) => (
					<GameScoreCard key={game.id} game={game} place={index + 1} />
				))}
			</div>
		</div>
	);
}
