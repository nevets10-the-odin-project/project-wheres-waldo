import React from "react";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import styles from "./nav.module.css";
import { Link } from "react-router-dom";

export default function Nav() {
	return (
		<>
			<div className={styles.nav}>
				<Icon className={styles.menuIcon} path={mdiMenu} size={2} color="white" />
				<Link to="/">Home</Link>
				<Link to="/images">Images</Link>
				<Link to="/leaderboard">Leaderboard</Link>
			</div>
		</>
	);
}
