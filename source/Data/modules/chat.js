/**
 * 处理发送、接收信息等事务
 * WebSocket 对象的建立与连接在 ChatBox 组件，此处用来包装数据，即：
 *     - 发送：传入信息与 `send()` 函数，处理信息后回调
 *     - 接收：`onmessage()` 函数收到信息后调用，返回处理后的信息
 * 以此维护发送过程中与接收过程中的状态
 */
import React, { Component } from "react";
import { message } from "antd";

import { Socket as ws } from "../../Components/WebSocket";
import { wsURL } from "../../Utils/request";

message.config({
	top: 64,
});

const initialState = {
	msg: "",
	ws: null,
};

const type = {
	RECV: "CHAT/RECV",
	INIT: "CHAT/INIT",
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
					message.success("您已退出聊天室");
				},
				socketOnError: (error) => {
					console.log(error);
					message.error("进入聊天室失败");
				},
				socketOnMessage: (msg) => creator.rcvMsg(msg),
				socketUrl: wsURL.chat,
			}),
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
			action.ws.connection();
			return { ...state, ws: action.ws };
		case type.RECV:
			return { ...state, msg: action.msg, id: action.id };
		default:
			return state;
	}
};

const selector = {
	getWs: (state) => state.chat.ws,
};

export { creator, reducer, selector };
