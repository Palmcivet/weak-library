import { dispatch } from "redux";

const STATUS_TYPES = {
	STATUS_SUCCESS: "NOTIFY/STATUS/SUCCESS",
	STATUS_FAILED: "NOTIFY/STATUS/FAILED",
	STATUS_SENDING: "NOTIFY/STATUS/SENDING",
};

// initial state
const initState = {
	status: "",
	msg: "",
};

// action types
const NOTIFY_TYPES = {
	MSG_RECV: "MSG/RECV",
	MSG_SEND: "MSG/SEND",
	MSG_SENT: "MSG/SENT",
};

// action creators
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
			return dispatch(creator.msgSend());
		case NOTIFY_TYPES.MSG_SENT:
			return state;
		default:
			return state;
	}
};

export { creator, reducer };
