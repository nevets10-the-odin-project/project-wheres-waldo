import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "./finishBanner.module.css";

export default function FinishBanner({ gameData, handleInitialsSubmit }) {
	const [isLoading, setIsLoading] = useState(false);

	const diff = new Date(gameData.end_time) - new Date(gameData.start_time);

	const minutes = Math.floor(diff / (1000 * 60));
	const seconds = Math.floor(diff / 1000) - minutes * 60;

	function submitInitials(e) {
		setIsLoading(true);
		handleInitialsSubmit(e);
	}

	return (
		<div className={styles.banner}>
			<h2>You found every character!</h2>
			{gameData.initials ? (
				<p>
					{gameData.initials} - Time: {minutes} Minute(s), {seconds} Second(s)
				</p>
			) : isLoading ? (
				<Icon path={mdiLoading} spin={1} size={10} />
			) : (
				<form onSubmit={submitInitials} className={styles.form}>
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
