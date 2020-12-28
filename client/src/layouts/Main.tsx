import React from "react";
import { Switch, Route } from "react-router-dom";

import { Auth } from "@/pages/Auth/index";
import { Book } from "@/pages/Book/index";
import { Home } from "@/pages/Home/index";
import { Search } from "@/pages/Search/index";
import { Reader } from "@/pages/Reader/index";
import { Profile } from "@/pages/Profile/index";
import style from "@/styles/index.less";

export const Main = () => (
	<main className={style.main}>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/auth" component={Auth} />
			<Route path="/book" component={Book} />
			<Route path="/home" component={Home} />
			<Route path="/search" component={Search} />
			<Route path="/reader" component={Reader} />
			<Route path="/profile" component={Profile} />
		</Switch>
	</main>
);
