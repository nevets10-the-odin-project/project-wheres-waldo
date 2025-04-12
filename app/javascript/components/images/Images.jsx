import React from "react";
import Nav from "../nav/Nav";
import Image from "../image/Image";
import { useParams } from "react-router-dom";

export default function Images() {
	const { id } = useParams();

	return (
		<>
			<Nav />
			{id === undefined ? <div>Images Index</div> : <Image />}
		</>
	);
}
