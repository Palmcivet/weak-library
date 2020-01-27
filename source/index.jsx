import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { rootReducer } from "./Data/index";
import { App } from "./Layouts/App";
import "./Layouts/App.less";
import "antd/dist/antd.css";

// rootStore = createStore(rootReducer);

render(
	// <Provider store={rootStore}>
	// 	<App />
	// </Provider>,
	<App />,
	document.getElementById("root")
);
