/**
 * 处理发送、接收信息等事务
 */

import { message } from "antd";

import { Socket as ws } from "../../Components/WebSocket";
import { CHAT } from "../../Utils/reference";
import { wsURL } from "../../Utils/request";

message.config({
	top: 64,
});

const initialState = {
	msg: [
		["2020", "通过设置 Button 按钮xvdvsvbzzsczc荐说明如下"],
		["0", "欢迎lxh"],
		["2323", "通过设置 Button 的属生不荐为 disabled。 按钮的asad说明如下"],
		["2323", "通过设置 Button disabled。 按钮的asad说明如下"],
		["0", "欢迎老玩家"],
		["2020", "通过设置 Button 的属生不同asdas式，推荐为 disabled。 按钮的属说明如下"],
		["0", "欢迎新玩家"],
		["2020", "通过设置 Button 的属生，推荐为 disabled。 按钮的属说明如下"],
		["23423", "再来 按钮的属说明如下"],
		["0", "新玩家🥚"],
	],
	user: {
		"2323": ["UIO", "#3886ce80"],
		"2020": ["Palm Civet", "#67e35779"],
		"23423": ["uioUIOui oUIOuioUIOusduioUIOuioUIOuioUIOuioUIOuioUIO", "#87e38799"],
	},
	ws: null,
};

const type = {
	CLEAR: "CHAT/CLEAR",
	SET_MSG: "CHAT/SET_MSG",
	SET_USR: "CHAT/SET_USR",
	CONNECT: "CHAT/CONNECT",
	QUIT: "CHAT/QUIT",
};

const creator = {
	sendMsg: (id, msg, callback) => {
		let message = {
			type: "chat",
			id: id,
			msg: msg,
		};

		callback(message);
		return (dispatch) => dispatch(creator.setMsg(message));
	},

	rcvMsg: (data) => {
		data = JSON.parse(data.data);

		message.info("您有新消息");
		return (dispatch) => {
			// 解析消息
			switch (data.type) {
				case CHAT.CHAT:
					dispatch(creator.setMsg(msg));
					break;
				case CHAT.BROADCAST:
					dispatch(creator.setUser(data.player));
					dispatch(creator.setMsg({ id: 0, msg: data.msg }));
					break;
				default:
					break;
			}
		};
	},

	initWs: () => {
		return {
			type: type.CONNECT,
			ws: new ws({
				socketUrl: wsURL.chat,
				socketOnOpen: () => {
					message.success("您已进入聊天室");
				},
				socketOnClose: () => {
					message.error("无法连接到服务器");
				},
				socketOnError: () => {},
				socketOnMessage: (msg) => creator.rcvMsg(msg),
			}),
		};
	},

	quitWs: () => {
		message.success("您已退出聊天室");
		return {
			type: type.QUIT,
			ws: null,
		};
	},

	clear: () => ({
		type: type.CLEAR,
		msg: [],
	}),

	setUser: (usr) => ({
		type: type.SET_USR,
		user: usr,
	}),

	setMsg: (msg) => ({
		type: type.SET_MSG,
		msg: Object.values(msg).slice(1),
	}),
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case type.CONNECT:
			action.ws.connect();
			return { ...state, ws: action.ws };
		case type.QUIT:
			return { ...state, ws: action.ws };
		case type.SET_MSG:
			return { ...state, msg: state.msg.concat([action.msg]) };
		case type.CLEAR:
			console.log(state);
			return { ...state, msg: action.msg };
		case type.SET_USR:
			return { ...state, user: action.user };
		default:
			return state;
	}
};

const selector = {
	getWs: (state) => state.chat.ws,
	getMsg: (state) => state.chat.msg,
	getUser: (state) => state.chat.user,
};

export { creator, reducer, selector };
