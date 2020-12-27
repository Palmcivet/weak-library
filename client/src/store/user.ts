import { action, computed, makeObservable, observable } from "mobx";
import { message } from "antd";

import { ECode, ERole, ESex } from "@/typings";
import { request } from "@/utils";

class User {
	@observable
	id!: string;

	@observable
	role!: ERole;

	@observable
	name!: string;

	constructor() {
		makeObservable(this);
		this.id = "";
		this.role = ERole.USER;
		this.name = "";
	}

	@computed
	get hasAuth() {
		return this.id !== "";
	}

	@action
	login(id: string, pass: string) {
		const key = "Login";
		message.loading({ content: "登录中", duration: 0, key });
		request("/auth/login", { id, pass }).then((res) => {
			if (res.code === ECode.SERVER_ERROR) {
				message.error({ content: res.msg, key });
			} else {
				this.id = res.data.id;
				this.role = res.data.role;
				this.name = res.data.name;
				message.success({ content: res.msg, key });
			}
		});
	}

	@action
	logout(id: string) {
		const key = "Logout";
		message.loading({ content: "登录中", duration: 0, key });
		request("/auth/logout", { id }).then((res) => {
			if (res.code === ECode.SERVER_ERROR) {
				this.id = "";
				this.name = "";
				this.role = ERole.USER;
				message.error({ content: res.msg, key });
			} else {
				message.success({ content: res.msg, key });
			}
		});
	}

	@action
	async register(
		id: string,
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
			this.id = "";
			this.name = "";
			this.role = ERole.USER;
			message.error({ content: res.msg, key });
		} else {
			this.login(id, pass);
		}
	}
}

export const userStore = new User();
