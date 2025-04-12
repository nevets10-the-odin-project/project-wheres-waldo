import React, { useEffect, useState } from "react";
import styles from "./image.module.css";
import { useParams } from "react-router-dom";
import CharacterDropdown from "../characterDropdown/CharacterDropdown";

export default function Image() {
	const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
	const [showBox, setShowBox] = useState(false);
	const [imgData, setImgData] = useState(undefined);
	const [foundCharacters, setFoundCharacters] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		try {
			fetch(`http://127.0.0.1:3000/api/images/${id}`, {
				"Access-Control-Allow-Origin": "*",
			})
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

	function handleCharSubmit(e) {
		const csrfToken = document.head.querySelector(
			"meta[name=csrf-token]"
		)?.content;

		try {
			fetch("http://127.0.0.1:3000/api/games/guess", {
				method: "post",
				headers: { "X-CSRF-Token": csrfToken, "Content-Type": "application/json" },
				body: JSON.stringify({
					guess: {
						character: e.target.innerText,
						start_x: coordinates.x - 25,
						end_x: coordinates.x + 25,
						start_y: coordinates.y - 25,
						end_y: coordinates.y + 25,
					},
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setShowBox(!showBox);
					console.log(data.found_characters);
				});
		} catch (error) {
			console.log(error);
		}
	}

	function createGame() {
		const csrfToken = document.head.querySelector(
			"meta[name=csrf-token]"
		)?.content;

		try {
			fetch("http://127.0.0.1:3000/api/games", {
				method: "post",
				"Content-Type": "application/json",
				headers: { "X-CSRF-Token": csrfToken },
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
					handleCharSubmit={handleCharSubmit}
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
