/**
 * 处理登录、注销登录等事务
 */

import { post, URL } from "../../Utils/request";

const initialState = {
	id: null,
	name: null,
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
				if (!data.error) {
					dispatch(creator.setLoginInfo(data.id, data.name));
				} else {
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
			return { ...state, id: null, name: null };
		default:
			return state;
	}
};

const selector = {
	getID: (state) => state.id,
	getName: (state) => state.name,
};

export { creator, reducer, selector };
