import { ECode } from "@/typings";

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
	return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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
	return {
		code,
		data,
		msg,
	};
};
