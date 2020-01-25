import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { rootReducer } from "./Redux/index";
import { App } from "./Layouts/App";
import "./Layouts/App.less";

rootStore = createStore(rootReducer);

render(
	<Provider store={rootStore}>
		<App />
	</Provider>,
	document.getElementById("root")
);
