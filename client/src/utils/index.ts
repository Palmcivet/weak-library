import { IRes } from "@/typings";

const isDev = true;

const headers = new Headers({
	Accept: "application/json",
	"Content-Type": "application/json",
});

const BASE = isDev ? "http://127.0.0.1:8081" : "http://10.1.122.74:8080";

export const hasKeys = (obj: object) => Object.keys(obj).length > 0;

export const hasElements = (arr: Array<any>) => arr.length !== 0;

export const colLayout = {
	md: 20,
	lg: 18,
	xl: 16,
};

/**
 * 构造格式化时间字符串
 * @param date 传入时间字符串
 */
export const getFmtDate = (date: Date) => {
	const Y = date.getFullYear();
	const M = (date.getMonth() + 1).toString().padStart(2, "0");
	const D = date.getDate().toString().padStart(2, "0");
	const h = date.getHours().toString().padStart(2, "0");
	const m = date.getMinutes().toString().padStart(2, "0");
	const s = date.getSeconds().toString().padStart(2, "0");

	return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};

/**
 * 发送请求
 * @param path 路径
 * @param data 数据
 */
export const request = (path: string, data: any) =>
	fetch(BASE + path, {
		method: "POST",
		body: JSON.stringify(data),
		credentials: "same-origin",
		headers: headers,
		mode: "cors",
	})
		.then((res) => {
			if (res.status < 500) {
				return res.json();
			} else {
				console.error(`Request failed. Message = ${res.statusText}`);
				return { code: -3, data: null, msg: "Server error." };
			}
		})
		.then((res): IRes => res)
		.catch(
			(err): IRes => {
				console.error(`Request failed. Message = ${err}`);
				return { code: -3, data: null, msg: "Request failed." };
			}
		);
