import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "./Data/configureStore";
import { App } from "./Layouts/App";

import "./Utils/layout.css";
import "antd/dist/antd.css";

const rootStore = configureStore();

render(
	<Provider store={rootStore}>
		<App />
	</Provider>,
	document.getElementById("root")
);
