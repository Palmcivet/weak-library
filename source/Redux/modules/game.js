import { genFood } from "../../Utils/Rand";

const STATUS_TYPES = {
	STATUS_PLAYING: "STATUS/GAME_PLAYING",
	STATUS_PAUSE: "STATUS/GAME_PAUSE",
	STATUS_OVER: "STATUS/GAME_OVER",
};

const MODE_TYPES = {
	SINGLE: "SINGLE",
	MULTY: "MULTY",
};

// initial state
const initState = {
	status: STATUS_TYPES.STATUS_OVER,
	types: MODE_TYPES.SINGLE,
	food: {
		color: [100, 100, 100],
		position: 1,
	},
};

// action types
const GAME_TYPES = {
	GAME_START: "GAME/START",
	GAME_PAUSE: "GAME/PAUSE",
	GAME_OVER: "GAME/OVER",
};

// action creators
const creator = {
	gameStart: () => {
		/**
		 * TODO
		 * 1. 接收玩家列表
		 * 2. 请求 food 位置
		 * 3.
		 */
		return {
			type: GAME_TYPES.GAME_START,
		};
	},
	gameOver: () => ({
		type: STATUS_TYPES.GAME_OVER,
	}),
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case GAME_TYPES.GAME_START:
			return {
				...state,
				status: STATUS_TYPES.STATUS_PLAYING,
				food: genFood(),
			};
		case GAME_TYPES.GAME_OVER:
			return {
				...state,
				status: STATUS_TYPES.STATUS_STOP,
			};
		case GAME_TYPES.GAME_PAUSE:
			return {
				...state,
				status: STATUS_TYPES.STATUS_PAUSE,
			};
		default:
			return state;
	}
};

export { STATUS_TYPES, creator, reducer };
