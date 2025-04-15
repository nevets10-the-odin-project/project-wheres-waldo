import React from "react";
import styles from "./finishBanner.module.css";

export default function FinishBanner({ gameData, handleInitialsSubmit }) {
	return (
		<div className={styles.banner}>
			<h2>FinishBanner</h2>
			{gameData.initials ? (
				<p>{gameData.initials}</p>
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
