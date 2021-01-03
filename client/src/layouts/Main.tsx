import React from "react";
import { Switch, Route } from "react-router-dom";

import { Auth } from "@/pages/Auth/index";
import { Home } from "@/pages/Home/index";
import { Search } from "@/pages/Search/index";
import { Manage } from "@/pages/Manage/index";
import { Procedure } from "@/pages/Procedure/index";
import { Profile } from "@/pages/Profile/index";

import style from "@/styles/index.less";

export const Main = () => (
	<main className={style.main}>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/auth" component={Auth} />
			<Route path="/home" component={Home} />
			<Route path="/search" component={Search} />
			<Route path="/manage" component={Manage} />
			<Route path="/procedure" component={Procedure} />
			<Route path="/profile" component={Profile} />
		</Switch>
	</main>
);
