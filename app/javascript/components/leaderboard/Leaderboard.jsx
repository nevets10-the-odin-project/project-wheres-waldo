import React, { useState, useEffect } from "react";
import Nav from "../nav/Nav";
import styles from "./leaderboard.module.css";
import ImageLeaderboard from "../imageLeaderboard/ImageLeaderboard";

export default function Leaderboard() {
	const [imgData, setImgData] = useState(undefined);

	useEffect(() => {
		try {
			fetch(`/api/leaderboard/`)
				.then((res) => res.json())
				.then((data) => setImgData(data));
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
			<Nav />
			<div className={styles.leaderboards}>
				{imgData?.map((img) => (
					<ImageLeaderboard key={img.id} image={img} />
				))}
			</div>
		</>
	);
}
