import { action, computed, makeObservable, observable } from "mobx";

import { ECode, ERole } from "@/typings";
import { request } from "@/utils";
import { notifyStore } from "./notify";

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
		request("/auth/login", { id, pass }).then((res) => {
			if (res.code === ECode.SERVER_ERROR) {
				this.id = res.data.id;
				this.role = res.data.role;
				this.name = res.data.name;
			} else {
				notifyStore.setError(res.msg);
			}
		});
	}

	@action
	logout(id: string) {
		request("/auth/logout", { id }).then((res) => {
			if (res.code === ECode.SERVER_ERROR) {
				this.id = "";
				this.role = ERole.USER;
				this.name = "";
			} else {
				notifyStore.setError(res.msg);
			}
		});
	}
}

export const userStore = new User();
