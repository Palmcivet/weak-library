import { genFood } from "../../Utils/Rand";

const STATUS_TYPES = {
	STATUS_PLAYING: "GAME/STATUS/PLAYING",
	STATUS_PAUSE: "GAME/STATUS/PAUSE",
	STATUS_OVER: "GAME/STATUS/OVER",
};

// initial state
const initState = {
	status: GAME_STATUS.STATUS_OVER,
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
	gameStart: () => ({
		type: GAME_TYPES.GAME_START,
	}),
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

export { creator, reducer };
