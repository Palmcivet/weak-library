/**
 * 处理登录、连接、发送、游戏开始、失败等提示信息
 */

const STATUS_TYPES = {
	STATUS_SUCCESS: "STATUS/NOTIFY_SUCCESS",
	STATUS_FAILED: "STATUS/NOTIFY_FAILED",
	STATUS_SENDING: "STATUS/NOTIFY_SENDING",
};

const initState = {
	status: "",
	msg: "",
};

const NOTIFY_TYPES = {
	MSG_RECV: "MSG/RECV",
	MSG_SEND: "MSG/SEND",
	MSG_SENT: "MSG/SENT",
};

const creator = {
	msgRecv: (argRcvMsg) => ({
		type: NOTIFY_TYPES.MSG_RECV,
		msg: argRcvMsg,
	}),
	msgSend: (argSndMsg) => ({
		type: NOTIFY_TYPES.MSG_SEND,
		msg: argSndMsg,
		status: STATUS_TYPES.STATUS_SENDING,
	}),
	msgSent: (argSndMsg) => ({
		type: NOTIFY_TYPES.MSG_SENT,
		msg: argSndMsg,
		status: STATUS_TYPES.STATUS_SENT,
	}),
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case NOTIFY_TYPES.MSG_RECV:
			return {
				...state,
				msg: action.msg,
			};
		case NOTIFY_TYPES.MSG_SEND:
			return (dispatch) => dispatch(creator.msgSend());
		case NOTIFY_TYPES.MSG_SENT:
			return state;
		default:
			return state;
	}
};

export { creator, reducer };
