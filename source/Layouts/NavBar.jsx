import React, { Component } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Menu, Icon, Layout, Tag, Button } from "antd";

import { creator as authCreator, selector as authSelector } from "../Data/modules/auth";

const { Header } = Layout;

const NavBarView = (props) => {
	const { location } = props;
	let pathname =
		location.pathname === "/" ? "home" : location.pathname.replace("/", "");

	return (
		<Header
			style={{
				background: "rgba(0, 0, 0, 0)",
				padding: "0",
				textAlign: "center",
				height: "48px",
			}}
		>
			{/* TODO: 需要设置 state */}
			<Link to="/">
				<Icon type="thunderbolt" theme="twoTone" />
			</Link>
			<Menu selectedKeys={[pathname]} mode="horizontal">
				<Menu.Item key="home">
					<Link to="/home">HOME</Link>
				</Menu.Item>
				<Menu.Item key="game">
					<Link to="/game">GAME</Link>
				</Menu.Item>
				<Menu.Item key="docs">
					<Link to="/docs">DOCS</Link>
				</Menu.Item>
			</Menu>

			{props.id !== null ? (
				<div>
					<Tag color={props.color}>{props.username}</Tag>
					<Button onClick={props.logout}>Sign Out</Button>
				</div>
			) : (
				<div>
					<Tag color={props.color}>{props.username}</Tag>
					<Button>
						<Link to={{ pathname: "/auth", state: { from: location } }}>
							Sign In
						</Link>
					</Button>
				</div>
			)}
		</Header>
	);
};

const mapStateToProps = (state, props) => {
	return {
		id: authSelector.getID(state),
		username: authSelector.getName(state),
		//* TODO 建立 WS 连接之后返回
		color: "#2db7f5",
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators(authCreator, dispatch),
	};
};

const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarView);

export { NavBar };
