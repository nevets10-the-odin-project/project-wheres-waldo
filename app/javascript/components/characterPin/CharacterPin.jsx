import React from "react";
import styles from "./characterPin.module.css";

export default function CharacterPin({ character, coordinates }) {
	return (
		<div
			className={styles.pin}
			style={{
				top: coordinates.start_y - 40,
				left: coordinates.start_x,
			}}
		>
			<p>{character.name}</p>
		</div>
	);
}
