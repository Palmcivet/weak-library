import { IRes } from "@/typings";

const headers = new Headers({
	Accept: "application/json",
	"Content-Type": "application/json",
});

const BASE = true ? "http://127.0.0.1:8081" : "http://10.1.122.74:8080";

export const colLayout = {
	md: 20,
	lg: 18,
	xl: 16,
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
