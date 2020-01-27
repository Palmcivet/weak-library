import React, { Component } from "react";
import { Menu, Icon, Layout } from "antd";

const { Header } = Layout;

class NavBar extends Component {
	state = {
		current: "app",
	};

	handleClick = (e) => {
		console.log("click ", e);
		this.setState({
			current: e.key,
		});
	};

	render() {
		return (
			<Header
				style={{
					background: "rgba(0, 0, 0, 0)",
					padding: "0",
					textAlign: "center",
					height: "48px",
				}}
			>
				<Menu
					onClick={this.handleClick}
					selectedKeys={[this.state.current]}
					mode="horizontal"
				>
					<Menu.Item key="home">HOME</Menu.Item>
					<Menu.Item key="app">GAME</Menu.Item>
					<Menu.Item key="docs">DOCS</Menu.Item>
					<Menu.Item key="about">ABOUT</Menu.Item>
				</Menu>
				{/*
                {this.props.auth.status ? (
					<Icon>{this.props.name}</Icon>
				) : (
					<Button>Sign Out</Button>
				)} */}
			</Header>
		);
	}
}

export { NavBar };
