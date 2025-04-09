import React, { useEffect, useState } from "react";
import styles from "./image.module.css";
import { useParams } from "react-router-dom";
import CharacterDropdown from "../characterDropdown/CharacterDropdown";

export default function Image() {
	const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
	const [showBox, setShowBox] = useState(false);
	const [imgData, setImgData] = useState(undefined);
	const { id } = useParams();

	useEffect(() => {
		try {
			fetch(`http://localhost:3000/images/${id}`)
				.then((res) => res.json())
				.then((data) => setImgData(data));
		} catch (error) {
			console.log(error);
		}
	}, [id]);

	function handleClick(e) {
		setCoordinates({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
		setShowBox(!showBox);
	}

	function createGame() {
		try {
			fetch("http://localhost:3000/games", {
				method: "post",
				credentials: "include",
				"Content-Type": "application/json",
			});
		} catch (error) {
			console.log(error);
		}
	}

	if (imgData === undefined) return <div>Loading...</div>;

	return (
		<div className={styles.imageWrapper}>
			<div
				className={
					showBox ? `${styles.menuWrapper} ${styles.show}` : styles.menuWrapper
				}
				style={{ top: coordinates.y - 25, left: coordinates.x - 25 }}
			>
				<div className={styles.targetingBox}></div>
				<CharacterDropdown
					characters={imgData.characters.map((char) => char.name)}
				/>
			</div>
			<img
				src={imgData.file_name}
				alt=""
				onClick={handleClick}
				onLoad={() => createGame()}
			/>
		</div>
	);
}
