import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import styles from "./nav.module.css";
import { Link } from "react-router-dom";

export default function Nav() {
	const [showNav, setShowNav] = useState(false);

	function toggleMenu() {
		setShowNav(!showNav);
	}
	return (
		<>
			<div className={styles.nav}>
				<div className={styles.iconWrapper} onClick={toggleMenu}>
					<Icon className={styles.menuIcon} path={mdiMenu} size={2} color="white" />
				</div>
				{showNav && (
					<>
						<Link to="/">Home</Link>
						<Link to="/images">Images</Link>
						<Link to="/leaderboard">Leaderboard</Link>
					</>
				)}
			</div>
		</>
	);
}
