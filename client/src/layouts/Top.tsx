import React from "react";
import { Link } from "react-router-dom";
import { Col, Dropdown, Menu, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { userStore } from "@/store/user";
import style from "@/styles/index.less";
import logo from "&/assets/logo.png";

const dropdownMenu = (
	<Menu>
		<Menu.Item>查看信息</Menu.Item>
		<Menu.Item>
			<div onClick={() => userStore.logout(userStore.id)}>退出登录</div>
		</Menu.Item>
	</Menu>
);

export const Top = () => {
	return (
		<header className={style.top}>
			<Row align={"middle"}>
				<Col sm={4}>
					<div onClick={() => location.reload()} style={{ cursor: "pointer" }}>
						<img src={logo} alt="logo" style={{ height: 48 }} />
					</div>
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
							<Link to="/profile">我的借阅</Link>
						</Menu.Item>
					</Menu>
				</Col>

				<Col sm={2} style={{ textAlign: "right" }}>
					{userStore.hasAuth ? (
						<Dropdown overlay={dropdownMenu} placement="bottomCenter" arrow>
							<Link to="/profile">{userStore.name}</Link>
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
};
