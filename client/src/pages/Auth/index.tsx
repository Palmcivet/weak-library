import React, { Component } from "react";
import { Button, Input, Form, Checkbox, Layout, message } from "antd";

import { userStore } from "@/store/user";
import { VerifyCode } from "@/utils/VerifyCode";
import style from "./style.less";

interface IProps {}

interface IState {
	verify: VerifyCode;
}

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

	onFinish = (e: { id: string; pass: string; valid: string }) => {
		if (this.state.verify.validate(e.valid)) {
			userStore.login(e.id, e.pass);
		} else {
			message.error("验证码错误");
			this.state.verify.refresh();
		}
	};

	render() {
		return (
			<Layout className={style.layout}>
				<Form
					className={style.form}
					initialValues={{
						remember: true,
					}}
					onFinish={this.onFinish}
				>
					<div className={style.title}>图书馆 用户登陆</div>
					<Form.Item
						name="id"
						rules={[
							{
								required: true,
								message: "请输入用户名",
							},
						]}
					>
						<Input placeholder="账号" />
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
						<Input.Password placeholder="密码" />
					</Form.Item>

					<div className={style.valid}>
						<Form.Item
							name="valid"
							rules={[
								{
									required: true,
									message: "请输入验证码",
								},
							]}
							className={style.modify}
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
						<Checkbox>保持登录</Checkbox>
					</Form.Item>
				</Form>
			</Layout>
		);
	}
}
