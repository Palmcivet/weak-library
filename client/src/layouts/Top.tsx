import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Menu, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

import style from "@/styles/index.less";
import logo from "&/assets/logo.png";

interface IProps {
	auth?: Boolean;
}

interface IState {
	auth: Boolean;
}

export class Top extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			auth: true,
		};
	}

	render() {
		return (
			<header className={style.top}>
				<Row align={"middle"}>
					<Col sm={4}>
						<Link to="/">
							<img src={logo} alt="logo" style={{ height: 48 }} />
						</Link>
					</Col>

					<Col sm={18}>
						<Menu mode="horizontal" defaultSelectedKeys={["1"]}>
							<Menu.Item key="1">
								<Link to="/home">图书首页</Link>
							</Menu.Item>
							<Menu.Item key="2">
								<Link to="/book">馆藏查询</Link>
							</Menu.Item>
							<Menu.Item key="3">
								<Link to="/info">借阅历史</Link>
							</Menu.Item>
						</Menu>
					</Col>

					<Col sm={2} style={{ textAlign: "right" }}>
						{!this.state.auth ? (
							<Link to="/info">{"我的"}</Link>
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
