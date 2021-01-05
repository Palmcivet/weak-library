import React, { Component } from "react";
import { Redirect, RouteProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Button, Input, Form, Checkbox, Layout, message } from "antd";

import { UserStore } from "@/store/user";
import { VerifyCode } from "@/utils/VerifyCode";
import { IRootStore } from "@/typings";

import style from "./style.less";

interface IProps extends RouteProps, UserStore {}

interface IState {
	verify: VerifyCode;
}

@inject((root: IRootStore) => ({
	hasAuth: root.userStore.hasAuth,
	login: (id: number, pass: string) => root.userStore.login(id, pass),
}))
@observer
export class Auth extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			verify: new VerifyCode({ id: "verify", height: 37.5 }),
		};
	}

	componentDidMount() {
		this.state.verify.init();
	}

	onFinish = (e: { id: number; pass: string; valid: string }) => {
		if (this.state.verify.validate(e.valid)) {
			this.props.login(e.id, e.pass);
		} else {
			message.error("验证码错误");
			this.state.verify.refresh();
		}
	};

	render() {
		if (this.props.hasAuth) {
			return <Redirect to={{ pathname: "/home" }} />;
		}

		return (
			<Layout className={style["auth-layout"]}>
				<Form
					className={style["auth-form"]}
					initialValues={{ remember: true }}
					onFinish={this.onFinish}
				>
					<div className={style["auth-title"]}>图书馆 用户登陆</div>

					<Form.Item
						name="id"
						rules={[
							{
								required: true,
								message: "请输入用户名",
							},
						]}
					>
						<Input placeholder="账号" allowClear />
					</Form.Item>

					<Form.Item
						name="pass"
						rules={[
							{
								required: true,
								message: "请输入密码",
							},
						]}
					>
						<Input.Password placeholder="密码" allowClear />
					</Form.Item>

					<div className={style["auth-valid"]}>
						<Form.Item
							name="valid"
							rules={[
								{
									required: true,
									message: "请输入验证码",
								},
							]}
							className={style["auth-modify"]}
						>
							<Input placeholder="验证码" />
						</Form.Item>
						<div id="verify" />
					</div>

					<Form.Item style={{ marginBottom: 5 }}>
						<Button
							type="primary"
							htmlType="submit"
							style={{ width: "100%" }}
						>
							登录
						</Button>
					</Form.Item>

					<Form.Item name="remember" valuePropName="checked">
						<Checkbox style={{ userSelect: "none" }}>保持登录</Checkbox>
					</Form.Item>
				</Form>
			</Layout>
		);
	}
}
