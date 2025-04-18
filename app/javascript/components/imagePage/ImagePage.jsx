import React, { useEffect, useState, useRef } from "react";
import Icon from "@mdi/react";
import { mdiCloseThick, mdiLoading } from "@mdi/js";
import styles from "./imagePage.module.css";
import { useParams } from "react-router-dom";
import CharacterDropdown from "../characterDropdown/CharacterDropdown";
import CharacterPin from "../characterPin/CharacterPin";
import FinishBanner from "../finishBanner/FinishBanner";

export default function ImagePage() {
	const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
	const [isLoading, setIsLoading] = useState(true);
	const [isChecking, setIsChecking] = useState(false);
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
			fetch(`/api/images/${id}`)
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
			fetch(`/api/games/${gameData.id}`, {
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
		setIsChecking(true);
		lastGuess.current = coordinates;

		try {
			fetch("/api/games/guess", {
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

					setIsChecking(false);
					setShowBox(!showBox);
					setGameData(data);
				});
		} catch (error) {
			console.log(error);
		}
	}

	function imgFinishLoad() {
		createGame();
		setIsLoading(false);
	}

	function createGame() {
		try {
			fetch("/api/games", {
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

	if (imgData === undefined)
		return (
			<div className={styles.loading}>
				<Icon path={mdiLoading} spin={1} size={10} />
			</div>
		);

	return (
		<>
			<div className={styles.imageWrapper}>
				{isLoading && (
					<div className={styles.loading}>
						<Icon path={mdiLoading} spin={1} size={10} />
					</div>
				)}
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
				<div
					className={
						showBox ? `${styles.menuWrapper} ${styles.show}` : styles.menuWrapper
					}
					style={{ top: coordinates.y - 25, left: coordinates.x - 25 }}
				>
					{isChecking && (
						<div className={styles.loading} style={{ top: 5, left: 5 }}>
							<Icon path={mdiLoading} spin={1} size={2} />
						</div>
					)}
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
					onLoad={() => imgFinishLoad()}
				/>
			</div>
		</>
	);
}
