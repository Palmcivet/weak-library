import React from "react";
import { NavBar } from "./NavBar";
import { MapView } from "../Containers/MapView";
import { KeypadView } from "../Containers/KeypadView";

import "./App.less";

const App = () => (
	<div>
		<NavBar />
		<MapView />
		<KeypadView />
	</div>
);

export { App };
