import React from "react";
import styles from "./finishBanner.module.css";

export default function FinishBanner({ gameData, handleInitialsSubmit }) {
	const diff = new Date(gameData.end_time) - new Date(gameData.start_time);

	const minutes = Math.floor(diff / (1000 * 60));
	const seconds = Math.floor(diff / 1000) - minutes * 60;

	return (
		<div className={styles.banner}>
			<h2>You found every character!</h2>
			{gameData.initials ? (
				<p>
					{gameData.initials} - Time: {minutes} Minute(s), {seconds} Second(s)
				</p>
			) : (
				<form onSubmit={handleInitialsSubmit} className={styles.form}>
					<label>
						Initials:
						<input name="initials" maxLength="3" />
					</label>
					<button type="submit">Submit</button>
				</form>
			)}
		</div>
	);
}
