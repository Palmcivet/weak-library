export const hasKeys = (obj) => Object.keys(obj).length > 0;

export const hasElements = (arr) => arr.length !== 0;

/**
 * 构造格式化时间字符串
 * @param date 传入时间字符串
 */
export const getFmtDate = (date) => {
	const Y = date.getFullYear();
	const M = (date.getMonth() + 1).toString().padStart(2, "0");
	const D = date.getDate().toString().padStart(2, "0");
	const h = date.getHours().toString().padStart(2, "0");
	const m = date.getMinutes().toString().padStart(2, "0");
	const s = date.getSeconds().toString().padStart(2, "0");

	return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};
