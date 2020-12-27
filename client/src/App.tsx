import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { message } from "antd";

import { Top } from "@/layouts/Top";
import { Main } from "@/layouts/Main";
import { Bottom } from "@/layouts/Bottom";

import "@/styles/index.less";

message.config({
	top: 100,
	duration: 2,
	maxCount: 3,
});

export const RoutedApp = () => {
	return (
		<BrowserRouter>
			<Top />
			<Main />
			<Bottom />
		</BrowserRouter>
	);
};

ReactDOM.render(<RoutedApp />, document.getElementById("app"));
