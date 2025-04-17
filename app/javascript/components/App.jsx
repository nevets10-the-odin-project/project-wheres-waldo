import React from "react";
import styles from "./app.module.css";
import Nav from "./nav/Nav";

function App() {
	return (
		<>
			<Nav />
			<div className={styles.home}>
				<h1>Project: Where's Waldo</h1>
				<p>
					This is the penultimate project of{" "}
					<a href="https://www.theodinproject.com/paths/full-stack-ruby-on-rails/courses/react">
						The Odin Project's React course
					</a>
					. It is the first of two projects to really test the student's full-stack
					knowledge. In my case, I have been going through the Ruby on Rails path, so
					that is what makes up the back-end of this project.
				</p>
				<p>
					This project basically implements the game{" "}
					<a href="https://en.wikipedia.org/wiki/Where's_Wally">Where's Waldo</a>.
					Players will look at a busy image filled with dozens and dozens of
					characters doing various tasks. The goal is to find Waldo (or other
					specified characters) as quickly as possible. A leaderboard will show the
					players with the fastest times.
				</p>
				<h2>Pro Tip</h2>
				<p>
					The images are very large. To zoom out, press <strong>CTRL</strong> &{" "}
					<strong>- key</strong>. To zoom in, press <strong>CTRL</strong> &{" "}
					<strong>+ key</strong>
				</p>
			</div>
		</>
	);
}

export default App;
