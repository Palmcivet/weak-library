import { message } from "antd";
import { action, makeObservable } from "mobx";

class Notify {
	constructor() {
		makeObservable(this);
		message.config({
			top: 100,
			duration: 2,
			maxCount: 3,
			rtl: true,
		});
	}

	@action
	setInfo(msg: string) {
		message.info(msg);
	}

	@action
	setError(msg: string) {
		message.error(msg);
	}

	@action
	setWarn(msg: string) {
		message.warn(msg);
	}

	@action
	setLoading(msg: string) {
		message.loading(msg).then((res) => {
			console.log(res);
		});
	}
}

export const notifyStore = new Notify();
