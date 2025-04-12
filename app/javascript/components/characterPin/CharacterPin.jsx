import React from "react";
import styles from "./characterPin.module.css";

export default function CharacterPin({ character }) {
	return (
		<div
			className={styles.pin}
			style={{
				top: character.coordinates.y - 30,
				left: character.coordinates.x - 30,
			}}
		>
			<p>{character.name}</p>
		</div>
	);
}
