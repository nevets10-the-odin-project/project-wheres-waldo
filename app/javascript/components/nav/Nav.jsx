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
				<Link className={showNav ? "" : styles.hidden} to="/">
					Home
				</Link>
				<Link className={showNav ? "" : styles.hidden} to="/images">
					Images
				</Link>
				<Link className={showNav ? "" : styles.hidden} to="/leaderboard">
					Leaderboard
				</Link>
			</div>
		</>
	);
}
