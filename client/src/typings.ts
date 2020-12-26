export enum ERole {
	ADMIN,
	USER,
}

export enum ESex {
	MEN,
	WOMEN,
}

export enum ECode {
	DATABASE_FAIL = -2,
	SERVER_FAIL = -1,
	SUCCESS = 0,
	SERVER_ERROR = 1,
	DATABASE_ERROR = 2,
}

export interface IRes {
	code: ECode;
	data: any;
	msg: string;
}
