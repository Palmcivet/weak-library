export const BORROWED_TIME = 30; // 借阅时长

export const BORROWED_LIMIT = 5; // 借阅限制

export const isDev = process.env.NODE_ENV === "development";

export enum EResCode {
	SERVER_FAtal = -1,
	DATABASE_FAIL = -2,
	SUCCESS = 0,
	LOGIN_ERROR = 100,
	BOOK_BORROW_LIMIT = 300,
	BOOK_BORROW_EXCEED = 310,
	BOOK_BORROW_DOUBLE = 320,
	BOOK_RETURN_UNLENT = 350,
}

/**
 * 构造返回体
 * @param code 错误代码
 * @param msg 错误消息
 * @param data 数据
 */
export const genRes = (
	code: EResCode = EResCode.SUCCESS,
	msg: string = "",
	data: any = null
) => {
	return JSON.stringify({
		code,
		data,
		msg,
	});
};
