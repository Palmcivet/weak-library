import React, { Component } from "react";

import { NavBar } from "./NavBar";

const DocsView = (props) => {
	const { match, location } = props;

	return (
		<>
			<NavBar location={location} />
			<a href="https://github.com/Palmcivet/gluttonous-sanke">Github</a>
		</>
	);
};

let Docs = DocsView;

export { Docs };
