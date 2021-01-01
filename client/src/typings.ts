import { UserStore } from "./store/user";

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

export interface IUser {
	id: number;
	name: string;
	role: ERole;
}

export interface IRecord {
	key: number;
	borrow_date: string;
	name: string;
	indexes: string;
}

export interface IBook {
	key: number;
	index: string;
	name: string;
	type: number;
	author: string;
	press: string;
	price: number;
}

export interface IRootStore {
	userStore: UserStore;
}
