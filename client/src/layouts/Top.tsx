import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Dropdown, Menu, Row } from "antd";
import { inject, observer } from "mobx-react";
import { UserOutlined } from "@ant-design/icons";

import { UserStore } from "@/store/user";
import { ERole, IRootStore } from "@/typings";

import style from "@/styles/index.less";
import logo from "&/assets/logo.png";

interface IProps extends UserStore {}

interface IState {}

@inject((root: IRootStore) => ({
	id: root.userStore.id,
	role: root.userStore.role,
	name: root.userStore.name,
	hasAuth: root.userStore.hasAuth,
	logout: (id: number) => root.userStore.logout(id),
	setAuthInfo: (id: number, role: ERole, name: string) =>
		root.userStore.setAuthInfo(id, role, name),
}))
@observer
export class Top extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		if (window.sessionStorage.getItem("id") !== null) {
			this.props.setAuthInfo(
				Number.parseInt(window.sessionStorage.getItem("id") as string),
				Number.parseInt(window.sessionStorage.getItem("role") as string),
				window.sessionStorage.getItem("name") as string
			);
		}
	}

	render() {
		const { id, role, name, hasAuth, logout } = this.props;

		const dropdownMenu = (
			<Menu>
				<Menu.Item>
					<Link to="/profile">更改资料</Link>
				</Menu.Item>
				<Menu.Item>
					<div onClick={() => logout(id)}>退出登录</div>
				</Menu.Item>
			</Menu>
		);

		return (
			<header className={style.top}>
				<Row align={"middle"}>
					<Col sm={4}>
						<div style={{ cursor: "pointer" }}>
							<img
								src={logo}
								alt="logo"
								style={{ height: 48 }}
								onClick={() => location.reload()}
							/>
						</div>
					</Col>

					<Col sm={18}>
						<Menu mode="horizontal" defaultSelectedKeys={["1"]}>
							<Menu.Item key="1">
								<Link to="/home">我的借阅</Link>
							</Menu.Item>
							<Menu.Item key="2">
								<Link to="/search">馆藏查询</Link>
							</Menu.Item>
							{role === ERole.ADMIN ? (
								<>
									<Menu.Item key="3">
										<Link to="/book">图书管理</Link>
									</Menu.Item>
									<Menu.Item key="4">
										<Link to="/reader">读者管理</Link>
									</Menu.Item>
								</>
							) : (
								<></>
							)}
						</Menu>
					</Col>

					<Col sm={2} style={{ textAlign: "right" }}>
						{hasAuth ? (
							<Dropdown
								overlay={dropdownMenu}
								placement="bottomCenter"
								arrow
							>
								<Link to="/home">{name}</Link>
							</Dropdown>
						) : (
							<Link to="/auth">
								<UserOutlined style={{ fontSize: "1.5em" }} />
							</Link>
						)}
					</Col>
				</Row>
			</header>
		);
	}
}
