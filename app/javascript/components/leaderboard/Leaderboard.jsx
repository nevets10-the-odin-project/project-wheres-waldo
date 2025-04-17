import React, { useState, useEffect } from "react";
import Nav from "../nav/Nav";
import styles from "./leaderboard.module.css";
import ImageLeaderboard from "../imageLeaderboard/ImageLeaderboard";

export default function Leaderboard() {
	const [imgData, setImgData] = useState(undefined);

	useEffect(() => {
		try {
			fetch(`http://127.0.0.1:3000/api/leaderboard/`)
				.then((res) => res.json())
				.then((data) => setImgData(data));
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
			<Nav />
			{imgData?.map((img) => (
				<ImageLeaderboard key={img.id} image={img} />
			))}
		</>
	);
}
