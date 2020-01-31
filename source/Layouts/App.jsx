import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { NavBar } from "./NavBar";
import { Game } from "./Game";
import { Docs } from "./Docs";
import { Auth } from "./Auth";

const Home = (props) => {
	const { location } = props;

	return (
		<>
			<NavBar location={location} />
		</>
	);
};

const App = () => (
	<>
		<Router>
			<Switch>
				{/* <Route exact path="/" component={Home} /> */}
				<Route path="/home" component={Home} />
				<Route path="/" component={Game} />
				<Route path="/docs" component={Docs} />
				<Route path="/auth" component={Auth} />
			</Switch>
		</Router>
	</>
);

export { App };
