import React from "react";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";

import { NavBar } from "./NavBar";
import { Home } from "./Home";
import { Game } from "./Game";
import { Docs } from "./Docs";
import { Auth } from "./Auth";

const RouteApp = withRouter((props) => {
	const { location } = props;
	if (location.pathname === "/auth") {
		return <Route path="/auth" component={Auth} />;
	} else {
		return (
			<>
				<Route component={NavBar} />
				<Switch>
					<Route exact path="/" component={Home} />
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
	<Router basename="/gluttonous-sanke">
		<RouteApp />
	</Router>
);

export { App };
