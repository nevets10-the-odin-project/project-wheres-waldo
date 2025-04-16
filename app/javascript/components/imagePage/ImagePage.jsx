import React, { useEffect, useState, useRef } from "react";
import Icon from "@mdi/react";
import { mdiCloseThick } from "@mdi/js";
import styles from "./imagePage.module.css";
import { useParams } from "react-router-dom";
import CharacterDropdown from "../characterDropdown/CharacterDropdown";
import CharacterPin from "../characterPin/CharacterPin";
import FinishBanner from "../finishBanner/FinishBanner";

export default function ImagePage() {
	const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
	const [showBox, setShowBox] = useState(false);
	const [badGuess, setBadGuess] = useState(false);
	const [imgData, setImgData] = useState(undefined);
	const [gameData, setGameData] = useState(undefined);
	const lastGuess = useRef({ x: 0, y: 0 });
	const { id } = useParams();

	const csrfToken = document.head.querySelector(
		"meta[name=csrf-token]"
	)?.content;

	useEffect(() => {
		try {
			fetch(`http://127.0.0.1:3000/api/images/${id}`)
				.then((res) => res.json())
				.then((data) => setImgData(data));
		} catch (error) {
			console.log(error);
		}
	}, [id]);

	function handleClick(e) {
		setCoordinates({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
		setShowBox(!showBox);
		setBadGuess(false);
	}

	function handleInitialsSubmit(e) {
		e.preventDefault();

		try {
			fetch(`http://127.0.0.1:3000/api/games/${gameData.id}`, {
				method: "put",
				headers: { "X-CSRF-Token": csrfToken, "Content-Type": "application/json" },
				body: JSON.stringify({ initials: e.target[0].value }),
			})
				.then((res) => res.json())
				.then((data) => {
					setGameData(data);
				});
		} catch (error) {
			console.log(error);
		}
	}

	function handleCharSubmit(e) {
		lastGuess.current = coordinates;

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
					if (gameData.found_characters === data.found_characters) {
						setBadGuess(true);
					} else {
						setBadGuess(false);
					}

					setShowBox(!showBox);
					setGameData(data);
				});
		} catch (error) {
			console.log(error);
		}
	}

	function createGame() {
		try {
			fetch("http://127.0.0.1:3000/api/games", {
				method: "post",
				headers: { "X-CSRF-Token": csrfToken },
			})
				.then((res) => res.json())
				.then((data) => {
					setGameData(data);
				});
		} catch (error) {
			console.log(error);
		}
	}

	if (imgData === undefined) return <div>Loading...</div>;

	return (
		<>
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
				<div
					className={badGuess ? styles.show : styles.hide}
					style={{ top: lastGuess.current.y - 25, left: lastGuess.current.x - 25 }}
				>
					<Icon path={mdiCloseThick} size={2.5} color="red" />
				</div>
				{gameData?.found_characters &&
					JSON.parse(gameData.found_characters).map((charIndex) => (
						<CharacterPin
							key={charIndex}
							character={imgData.characters.find((c) => c.id === charIndex)}
							coordinates={imgData.coordinates.find(
								(c) => c.character_id === charIndex
							)}
						/>
					))}
				{gameData?.end_time && (
					<FinishBanner
						gameData={gameData}
						handleInitialsSubmit={handleInitialsSubmit}
					/>
				)}
				<img
					src={imgData.file_name}
					alt=""
					onClick={handleClick}
					onLoad={() => createGame()}
				/>
			</div>
		</>
	);
}
