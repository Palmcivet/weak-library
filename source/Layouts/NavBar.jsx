import React from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Menu, Icon, Button } from "antd";

import { GithubIcon } from "../../static/GithubIcon";
import { creator as authCreator, selector as authSelector } from "../Data/modules/auth";

const NavBarView = (props) => {
	let { location, bgStyle } = props;
	let pathname =
		location.pathname === "/" ? "home" : location.pathname.replace("/", "");

	const tagColor = {
		backgroundColor: props.color,
		display: "inline-block",
		height: "auto",
		margin: "4px",
		height: "24px",
		textAlign: "center",
		borderRadius: "3px",
		padding: "2px 7px",
		fontSize: "13px",
		color: "white",
	};

	if (bgStyle == undefined) {
		bgStyle = {
			background: "#ffffff",
			menuBoxShadow: "0 2px 8px #f0f1f2",
			menuBackground: "none",
		};
	}

	return (
		<header
			style={{
				background: bgStyle.background,
				textAlign: "right",
				height: "64px",
				padding: "0",
			}}
		>
			{/* TODO: 需要设置 state */}
			<Link to="/">
				<Icon
					type="thunderbolt"
					theme="twoTone"
					style={{
						width: "50px",
						background: "rgba(255, 255, 255, 0.2)",
						margin: "16px 24px 16px 20px",
						float: "left",
					}}
				/>
			</Link>

			<div
				style={{
					width: "300px",
					float: "right",
					textAlign: "center",
					margin: "8px 20px 8px 16px",
				}}
			>
				{props.id !== null ? (
					<>
						<span className="tag" style={tagColor}>
							{props.username}
						</span>
						<Button size="small" type="primary" onClick={props.logout}>
							Sign Out
						</Button>
					</>
				) : (
					<>
						<span className="tag" style={tagColor}>
							{props.username}
						</span>
						<Button size="small" type="primary" style={{ margin: "4px" }}>
							<Link to={{ pathname: "/auth", state: { from: location } }}>
								Sign In
							</Link>
						</Button>
					</>
				)}
			</div>
			<a
				data-v-553b04e0=""
				data-v-7c1a213e=""
				href="https://github.com/Palmcivet/gluttonous-sanke"
				aria-label="View source on GitHub"
			>
				<GithubIcon />
			</a>
			<Menu
				selectedKeys={[pathname]}
				mode="horizontal"
				style={{
					boxShadow: bgStyle.menuBoxShadow,
					background: bgStyle.menuBackground,
					borderBottom: "none",
					font: "bold",
					fontSize: "15px",
					fontWeight: 600,
				}}
			>
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
		</header>
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
