import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { Auth } from "@/pages/Auth";
import { Book } from "@/pages/Book";
import { Info } from "@/pages/Info";
import { Home } from "@/pages/Home";
import style from "@/styles/index.less";

interface IProps {}

interface IState {}

export class Main extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}

	render() {
		return (
			<main className={style.main}>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/home" component={Home} />
					<Route path="/auth" component={Auth} />
					<Route path="/book" component={Book} />
					<Route path="/info" component={Info} />
				</Switch>
			</main>
		);
	}
}
