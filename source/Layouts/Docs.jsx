import React, { Component } from "react";

import { NavBar } from "./NavBar";

const DocsView = (props) => {
	const { match, location } = props;

	return (
		<div>
			<a href="https://github.com/Palmcivet/gluttonous-sanke">Github</a>
		</div>
	);
};

let Docs = DocsView;

export { Docs };
