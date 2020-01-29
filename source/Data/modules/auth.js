/**
 * 处理登录、注销登录等事务
 */

import { post, URL } from "../../Utils/request";

const initialState = {
	id: null,
	name: "未登录",
};

const type = {
	LOGIN: "AUTH/LOGIN",
	LOGOUT: "AUTH/LOGOUT",
};

const creator = {
	login: (username, password) => {
		return (dispatch) => {
			const params = {
				username,
				password,
			};
			return post(URL.login(), params).then((data) => {
				//* 打印日志
				console.log(data);
				switch (data.code) {
					case 1:
						dispatch(creator.setLoginInfo(data.info.id, username));
						break;
					case 2: //密码错误
						console.log(data.message);
						break;
					case 3: // 用户名已存在
						console.log(data.message);
						break;
					default:
						break;
					// TODO: 处理全局消息
				}
			});
		};
	},
	logout: () => ({
		type: type.LOGOUT,
	}),
	setLoginInfo: (id, name) => ({
		type: type.LOGIN,
		id: id,
		name: name,
	}),
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case type.LOGIN:
			return { ...state, id: action.id, name: action.name };
		case type.LOGOUT:
			return { ...state, id: null, name: "未登录" };
		default:
			return state;
	}
};

const selector = {
	getID: (state) => state.auth.id,
	getName: (state) => state.auth.name,
};

export { creator, reducer, selector };
