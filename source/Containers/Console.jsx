import React, { Component } from "react";
import { MapView } from "./MapView";
import { KeypadView } from "./KeypadView";

const ConsoleView = (props) => {
	return (
		<>
			<MapView />
			<KeypadView />
		</>
	);
};

let Console = ConsoleView;

export { Console };
