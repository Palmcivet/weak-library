/**
 * 处理发送、接收信息等事务
 */

import { message } from "antd";

import { Socket as ws } from "../../Components/WebSocket";
import { wsURL } from "../../Utils/request";

message.config({
	top: 64,
});

const initialState = {
	msg: [],
	ws: null,
};

const type = {
	RECV: "CHAT/RECV",
	INIT: "CHAT/INIT",
	CANCEL: "CHAT/CANCEL",
};

const creator = {
	sendMsg: (id, content, callback) => {
		let msg = {
			type: "chat",
			id: id,
			msg: content,
		};

		callback(msg);
		return (dispatch) => dispatch(creator.setMsg(msg));
	},

	rcvMsg: (msg) => {
		message.info("您有新消息");
		return (dispatch) => {
			// 解析消息
			dispatch(creator.setMsg(msg));
		};
	},

	initWs: () => {
		return {
			type: type.INIT,
			ws: new ws({
				socketOnOpen: () => {
					message.success("您已进入聊天室");
				},
				socketOnClose: () => {
					message.error("无法连接到服务器");
				},
				socketOnError: () => {},
				socketOnMessage: (msg) => creator.rcvMsg(msg),
				socketUrl: wsURL.chat,
			}),
		};
	},

	cancelWs: () => {
		message.success("您已退出聊天室");
		return {
			type: type.CANCEL,
			ws: null,
		};
	},

	setMsg: (msg) => {
		return {
			type: type.RECV,
			id: msg.id,
			msg: msg.msg,
		};
	},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case type.INIT:
			action.ws.connect();
			return { ...state, ws: action.ws };
		case type.RECV:
			return { ...state, msg: action.msg, id: action.id };
		case type.CANCEL:
			return { ...state, ws: action.ws };
		default:
			return state;
	}
};

const selector = {
	getWs: (state) => state.chat.ws,
};

export { creator, reducer, selector };
