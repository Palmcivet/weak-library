import { UserStore } from "./store/user";

export enum EResCode {
	SERVER_FAIL = -1,
	DATABASE_FAIL = -2,
	SUCCESS = 0,
	LOGIN_ERROR = 100,
	BOOK_BORROW_LIMIT = 300,
	BOOK_BORROW_EXCEED = 310,
	BOOK_BORROW_DOUBLE = 320,
	BOOK_RETURN_UNLENT = 350,
}

export enum ERole {
	ADMIN,
	USER,
}

export enum ESex {
	MEN,
	WOMEN,
}

export interface IRes {
	code: EResCode;
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
	date: string;
	name: string;
	index: string;
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

export interface IReader {
	id: number;
	name: string;
	pass: boolean;
	sex: ESex;
	role: ERole;
	reg: string;
	tel: string;
	email: string;
}

export interface IRootStore {
	userStore: UserStore;
}
