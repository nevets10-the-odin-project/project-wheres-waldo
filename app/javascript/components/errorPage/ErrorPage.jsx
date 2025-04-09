import React from "react";
import Nav from "../nav/Nav";
import styles from "../app.module.css";

export default function ErrorPage() {
	return (
		<>
			<Nav />
			<div className={styles.home}>
				There seems to have been an error while trying to process your request.
				Please try again.
			</div>
		</>
	);
}
