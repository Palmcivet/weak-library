import React, { Component } from "react";
import { MapView } from "./MapView";
import { KeypadView } from "./KeypadView";

const ConsoleView = (props) => {
	const parent = {};

	const chamfer = {
		border: "5px solid backgroundColor",
		borderColor: "#689a1a #d1ff61 #d1ff61 #689a1a",
	};

	const border = {};

	return (
		<div>
			<div className="screen">
				<MapView />
			</div>
			<div className="keypad">
				<KeypadView />
			</div>
		</div>
	);
};

let Console = ConsoleView;

export { Console };
