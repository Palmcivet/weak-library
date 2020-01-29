import React, { Component } from "react";

import { ChatBox } from "../Containers/ChatBox";
import { NavBar } from "./NavBar";
// import { Console } from "../Containers/Console";

const Game = (props) => {
	const { match, location } = props;

	return (
		<>
			<NavBar location={location} />
			{/* <Console /> */}
			<ChatBox />
		</>
	);
};

export { Game };
