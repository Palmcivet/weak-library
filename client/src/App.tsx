import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { message } from "antd";

import { Top } from "@/layouts/Top";
import { Main } from "@/layouts/Main";
import { Bottom } from "@/layouts/Bottom";
import { UserStore } from "@/store/user";

import "@/styles/index.less";

message.config({
	top: 100,
	duration: 2,
	maxCount: 3,
});

const initStore = {
	userStore: new UserStore(),
};

export const App = () => {
	return (
		<Provider {...initStore}>
			<BrowserRouter>
				{/* @ts-ignore */}
				<Top />
				<Main />
				<Bottom />
			</BrowserRouter>
		</Provider>
	);
};

ReactDOM.render(<App />, document.getElementById("app"));
