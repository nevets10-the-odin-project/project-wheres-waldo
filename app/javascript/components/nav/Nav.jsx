import React from "react";
import styles from "./nav.module.css";
import { Link } from "react-router-dom";

export default function Nav() {
	return (
		<div className={styles.nav}>
			<Link to="/">Home</Link>
			<Link to="/images">Images</Link>
			<Link to="/leaderboard">Leaderboard</Link>
		</div>
	);
}
