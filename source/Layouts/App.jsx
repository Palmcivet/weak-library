import React from "react";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";

import { NavBar } from "./NavBar";
import { Home } from "./Home";
import { Game } from "./Game";
import { Docs } from "./Docs";
import { Auth } from "./Auth";

const RouteApp = withRouter((props) => {
	const { location } = props;
	console.log(location);
	if (location.pathname === "/auth") {
		return <Route path="/auth" component={Auth} />;
	} else {
		return (
			<>
				<Route component={NavBar} />
				<Switch>
					<Route path="/home" component={Home} />
					<Route path="/game" component={Game} />
					<Route path="/docs" component={Docs} />
					<Route path="/auth" component={Auth} />
				</Switch>
			</>
		);
	}
});

const App = () => (
	<Router basename="/snake">
		<RouteApp />;
	</Router>
);

export { App };
