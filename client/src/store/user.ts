import { action, computed, makeObservable, observable } from "mobx";
import { message } from "antd";

import { request } from "@/utils";
import { ECode, ERole, ESex, IUser } from "@/typings";

export class UserStore implements IUser {
	@observable
	id;

	@observable
	role;

	@observable
	name;

	constructor() {
		makeObservable(this);
		this.id = 0;
		this.name = "";
		this.role = ERole.USER;
	}

	@computed
	get hasAuth() {
		return this.id !== 0;
	}

	@action
	setAuthInfo(id: number, role: ERole, name: string) {
		this.id = id;
		this.role = role;
		this.name = name;
	}

	@action
	async login(id: number, pass: string) {
		const key = "Login";
		message.loading({ content: "登录中", duration: 0, key });
		const res = await request("/auth/login", { id, pass });
		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg, key });
		} else {
			const { id, role, name } = res.data;
			this.setAuthInfo(id, role, name);
			window.sessionStorage.setItem("id", id);
			window.sessionStorage.setItem("role", role);
			window.sessionStorage.setItem("name", name);
			message.success({ content: res.msg, key });
		}
	}

	@action
	async logout(id: number) {
		const key = "Logout";
		message.loading({ content: "登录中", duration: 0, key });
		const res = await request("/auth/logout", { id });
		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg, key });
		} else {
			this.setAuthInfo(0, ERole.USER, "");
			window.sessionStorage.removeItem("id");
			window.sessionStorage.removeItem("role");
			window.sessionStorage.removeItem("name");
			message.success({ content: res.msg, key });
			location.replace("/home");
		}
	}

	@action
	async register(
		id: number,
		pass: string,
		name: string,
		sex: ESex,
		role: ERole,
		tel: string,
		email: string
	) {
		const key = "Register";
		message.loading({ content: "正在处理", duration: 0, key });
		const res = await request("/auth/register", {
			id,
			pass,
			name,
			sex,
			role,
			tel,
			email,
		});
		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg, key });
		} else {
			this.login(id, pass);
		}
	}
}
