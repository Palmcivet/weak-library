export enum EResponseCode {
	FAIL = -1,
	SUCCESS = 0,
	ERROR = 1,
}

export interface IResponseType {
	code: EResponseCode;
	msg: string;
}
