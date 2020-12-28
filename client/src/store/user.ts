import { action, computed, makeObservable, observable } from "mobx";
import { message } from "antd";

import { ECode, ERole, ESex } from "@/typings";
import { request } from "@/utils";

export class UserStore {
	@observable
	id!: number;

	@observable
	role!: ERole;

	@observable
	name!: string;

	constructor() {
		makeObservable(this);
		this.id = 0;
		this.role = ERole.USER;
		this.name = "";
	}

	@computed
	get hasAuth() {
		return this.id !== 0;
	}

	@action
	async login(id: number, pass: string) {
		const key = "Login";
		message.loading({ content: "登录中", duration: 0, key });
		const res = await request("/auth/login", { id, pass });
		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg, key });
		} else {
			this.id = res.data.id;
			this.role = res.data.role;
			this.name = res.data.name;
			message.success({ content: res.msg, key });
		}
	}

	@action
	async logout(id: number) {
		const key = "Logout";
		message.loading({ content: "登录中", duration: 0, key });
		const res = await request("/auth/logout", { id });
		if (res.code === ECode.SERVER_ERROR) {
			this.id = 0;
			this.name = "";
			this.role = ERole.USER;
			message.error({ content: res.msg, key });
		} else {
			message.success({ content: res.msg, key });
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
			this.id = 0;
			this.name = "";
			this.role = ERole.USER;
			message.error({ content: res.msg, key });
		} else {
			this.login(id, pass);
		}
	}
}
