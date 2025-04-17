import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "./images.module.css";
import Nav from "../nav/Nav";
import ImagePage from "../imagePage/ImagePage";
import ImageCard from "../imageCard/ImageCard";

export default function Images() {
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		try {
			fetch(`/api/images/`)
				.then((res) => res.json())
				.then((data) => {
					setImages(data);
					setIsLoading(false);
				});
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
			<Nav />
			<div className={styles.imagesWrapper}>
				{isLoading ? (
					<Icon path={mdiLoading} spin={1} size={10} />
				) : id === undefined ? (
					images.map((image) => <ImageCard key={image.id} image={image} />)
				) : (
					<ImagePage />
				)}
			</div>
		</>
	);
}
