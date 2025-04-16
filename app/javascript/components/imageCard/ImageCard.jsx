import React from "react";
import styles from "./imageCard.module.css";

export default function ImageCard({ image }) {
	return (
		<a href={`/images/${image.id}`}>
			<div className={styles.card}>{image.name}</div>
		</a>
	);
}
