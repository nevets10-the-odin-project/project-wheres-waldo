import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import Nav from "../nav/Nav";
import styles from "./leaderboard.module.css";
import ImageLeaderboard from "../imageLeaderboard/ImageLeaderboard";

export default function Leaderboard() {
	const [imgData, setImgData] = useState(undefined);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		try {
			fetch(`/api/leaderboard/`)
				.then((res) => res.json())
				.then((data) => {
					setImgData(data);
					setIsLoading(false);
				});
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
			<Nav />
			<div className={styles.leaderboards}>
				{isLoading ? (
					<Icon path={mdiLoading} spin={1} size={10} />
				) : (
					imgData?.map((img) => <ImageLeaderboard key={img.id} image={img} />)
				)}
			</div>
		</>
	);
}
