/**
 * 处理发送、接收信息等事务
 * WebSocket 对象的建立与连接在 ChatBox 组件，此处用来包装数据，即：
 *     - 发送：传入信息与 `send()` 函数，处理信息后回调
 *     - 接收：`onmessage()` 函数收到信息后调用，返回处理后的信息
 * 以此维护发送过程中与接收过程中的状态
 */

import { webSocket } from "../../Components/webSocket";

//* TEST
const wsObj = {
	socketOnOpen: () => console.log("open"),
	socketOnClose: () => console.log("close"),
	socketOnMessage: (info) => console.log(info),
	socketOnError: (err) => console.error(err),
	socketUrl: "ws://localhost:8080/chat",
};

const initialState = {
	msg: "",
	date: "",
	loading: false,
	ws: null,
};

const type = {
	SEND: "CHAT/SEND",
	RECV: "CHAT/RECV",
	INIT: "CHAT/INIT",
};

const creator = {
	sendMsg: (id, text, callback) => {
		let msg = {
			type: "chat",
			id: "123456",
			content: text,
		};
		//* TEST
		msg = {
			username: "jack",
			msg: text,
		};

		callback(msg);

		return { type: type.SEND };
	},

	rcvMsg: (msg) => (dispatch) => {
		dispatch(creator.setMsg(msg));
	},

	initWs: () => {
		wsObj.socketOnMessage = creator.rcvMsg();

		return {
			type: type.INIT,
			ws: new webSocket(wsObj),
		};
	},

	setMsg: (msg) => ({
		type: type.RECV,
		msg: msg,
	}),
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case type.SEND:
			return { ...state, msg: action.msg, id: action.id, time: new Date() };
		case type.RECV:
			console.log(action);
			return { ...state, id: null, name: null };
		case type.INIT:
			action.ws.connection();
			return { ...state, ws: action.ws };
		default:
			return state;
	}
};

const selector = {
	getLoading: (state) => state.chat.loading,
	getWs: (state) => state.chat.ws,
};

export { creator, reducer, selector };
