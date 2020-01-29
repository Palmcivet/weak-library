import React, { useState } from "react";
import { Button, Input } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { NavBar } from "./NavBar";
import { creator as authCreator } from "../Data/modules/auth";

const AuthView = (props) => {
	const { from } = props.location.state || { from: { pathname: "/" } };
	const { redirectToReferrer } = props;

	const { match, location } = props;

	if (redirectToReferrer) {
		return <Redirect to={from} />;
	}

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div>
			<NavBar location={location} />

			<Input
				placeholder="username"
				value={username}
				allowClear
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Input.Password
				placeholder="password"
				value={password}
				visibilityToggle
				allowClear
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button type="primary" onClick={() => props.login(username, password)}>
				登录
			</Button>
			<Button type="primary" onClick={() => props.login("1234", "123456")}>
				测试：错误
			</Button>
			<Button type="primary" onClick={() => props.login(123456, 123456)}>
				测试：正常
			</Button>
		</div>
	);
};

const mapStateToProps = (state, props) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators(authCreator, dispatch),
	};
};

const Auth = connect(mapStateToProps, mapDispatchToProps)(AuthView);

export { Auth };
