import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { Top } from "@/layouts/Top";
import { Main } from "@/layouts/Main";
import { Btm } from "@/layouts/Btm";

import "@/styles/index.less";

export const RoutedApp = () => {
	return (
		<Router>
			<Top />
			<Main />
			<Btm />
		</Router>
	);
};

ReactDOM.render(<RoutedApp />, document.getElementById("app"));
