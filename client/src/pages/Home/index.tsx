import React, { Component } from "react";
import { Redirect, RouteProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Layout, message } from "antd";

import { UserStore } from "@/store/user";
import { IRootStore } from "@/typings";

import style from "./style.less";

interface IProps extends RouteProps, UserStore {}

interface IState {}

@inject((root: IRootStore) => ({
	hasAuth: root.userStore.hasAuth,
}))
@observer
export class Home extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}

	async notify() {
		await message.info("需要登录");
	}

	render() {
		if (!this.props.hasAuth) {
			message.info("请先登陆");
			return <Redirect to={{ pathname: "/auth" }} />;
		}

		return (
			<Layout className={style["home-layout"]}>
				<div></div>
			</Layout>
		);
	}
}
