/**
 * 处理发送、接收信息等事务
 * WebSocket 对象的建立与连接在 ChatBox 组件，此处用来包装数据，即：
 *     - 发送：传入信息与 `send()` 函数，处理信息后回调
 *     - 接收：`onmessage()` 函数收到信息后调用，返回处理后的信息
 * 以此维护发送过程中与接收过程中的状态
 */

import { selector as chatSelector } from "./auth";

const initialState = {
	msg: "",
	date: "",
};

const type = {
	SEND: "CHAT/SEND",
	RECV: "CHAT/RECV",
};

const creator = {
	send: (text, callback) => {
		return (dispatch) => {
			const msg = {
				id: chatSelector.getID(),
				text,
				date: new Date().toUTCString(),
			};
			let onSend = new Promise((resolve, reject) => callback(msg));
			return onSend
				.then((msg) => dispatch(creator.setMsg(msg)))
				.catch(
					// TODO: 处理全局消息
					(error) => console.log(error)
				);
		};
	},
	receive: (msg) => ({
		type: type.RECV,
		msg: msg,
	}),
	setMsg: (msg) => ({
		type: type.RECV,
	}),
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case type.SEND:
			return { ...state, msg: action.msg, id: action.id, time: new Date() };
		case type.RECV:
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
