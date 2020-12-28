import { ECode } from "@/typings";

export const BORROWED_TIME = 30; // 借阅时长

export const BORROWED_LIMIT = 5; // 借阅限制

export const isDev = process.env.NODE_ENV === "development";

export const hasKeys = (obj: object) => Object.keys(obj).length > 0;

export const hasElements = (arr: Array<any>) => arr.length !== 0;

export const cloneObj = (obj: object, deepCopy = true) => {
	return deepCopy ? JSON.parse(JSON.stringify(obj)) : Object.assign({}, obj);
};

/**
 * 构造格式化时间字符串
 */
export const getFmtDate = () => {
	const date = new Date();
	const Y = date.getFullYear();
	const M = (date.getMonth() + 1).toString().padStart(2, "0");
	const D = date.getDate().toString().padStart(2, "0");
	const h = date.getHours().toString().padStart(2, "0");
	const m = date.getMinutes().toString().padStart(2, "0");
	const s = date.getSeconds().toString().padStart(2, "0");

	return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};

export const addDate = (date: string, days: number) => {
	const res = new Date(date);
	res.setDate(res.getDate() + days);
	return res;
};

/**
 * 构造返回体
 * @param code 错误代码
 * @param msg 错误消息
 * @param data 数据
 */
export const genRes = (
	code: ECode = ECode.SUCCESS,
	msg: string = "",
	data: any = null
) => {
	return JSON.stringify({
		code,
		data,
		msg,
	});
};
