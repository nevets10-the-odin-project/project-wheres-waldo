import React from "react";
import styles from "./imageCard.module.css";

export default function ImageCard({ image }) {
	return <div className={styles.card}>{image.name}</div>;
}
