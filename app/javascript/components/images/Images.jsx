import React, { useState, useEffect } from "react";
import Nav from "../nav/Nav";
import Image from "../image/Image";
import { useParams } from "react-router-dom";

export default function Images() {
	const [images, setImages] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		try {
			fetch(`http://127.0.0.1:3000/api/images/`)
				.then((res) => res.json())
				.then((data) => setImages(data));
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
			<Nav />
			{id === undefined ? (
				images.map((image) => <div>{image.name}</div>)
			) : (
				<Image />
			)}
		</>
	);
}
