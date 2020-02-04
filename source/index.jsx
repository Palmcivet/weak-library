import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "./Data/configureStore";
import { rootReducers } from "./Data/index";
import { App } from "./Layouts/App";

import "./Utils/layout.css";
import "antd/dist/antd.css";

// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
// const rootStore = createStoreWithMiddleware(rootReducers);

const rootStore = configureStore();

render(
	<Provider store={rootStore}>
		<App />
	</Provider>,
	document.getElementById("root")
);
