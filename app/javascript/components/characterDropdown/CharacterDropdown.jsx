import React from "react";
import styles from "./characterDropdown.module.css";

export default function CharacterDropdown({ characters, handleCharSubmit }) {
	return (
		<ul className={styles.charDropdown}>
			{characters.map((character, index) => (
				<li key={index} className={styles.character} onClick={handleCharSubmit}>
					{character}
				</li>
			))}
		</ul>
	);
}
