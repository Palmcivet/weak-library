import { action, computed, makeObservable, observable } from "mobx";
import { message } from "antd";

import { request } from "@/utils";
import { ERole, EResCode, IUser } from "@/typings";

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

		if (res.code === EResCode.SUCCESS) {
			const { id, role, name } = res.data;
			this.setAuthInfo(id, role, name);
			window.sessionStorage.setItem("id", id);
			window.sessionStorage.setItem("role", role);
			window.sessionStorage.setItem("name", name);
			message.success({ content: res.msg, key });
		} else {
			message.error({ content: res.msg, key });
		}
	}

	@action
	async logout(id: number) {
		const key = "Logout";
		message.loading({ content: "登录中", duration: 0, key });
		const res = await request("/auth/logout", { id });
		if (res.code === EResCode.SUCCESS) {
			this.setAuthInfo(0, ERole.USER, "");
			window.sessionStorage.removeItem("id");
			window.sessionStorage.removeItem("role");
			window.sessionStorage.removeItem("name");
			message.success({ content: res.msg, key });
			location.replace("/home");
		} else {
			message.error({ content: res.msg, key });
		}
	}
}
