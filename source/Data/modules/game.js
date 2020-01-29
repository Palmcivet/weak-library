const STATUS_TYPES = {
	STATUS_PLAYING: "STATUS/GAME_PLAYING",
	STATUS_PAUSE: "STATUS/GAME_PAUSE",
	STATUS_OVER: "STATUS/GAME_OVER",
};

const MODE_TYPES = {
	SINGLE: "SINGLE",
	MULTY: "MULTY",
};

const initState = {
	status: STATUS_TYPES.STATUS_OVER,
	types: MODE_TYPES.SINGLE,
	food: {
		color: [100, 100, 100],
		position: 1,
	},
};

const type = {
	GAME_START: "GAME/START",
	GAME_PAUSE: "GAME/PAUSE",
	GAME_OVER: "GAME/OVER",
};

const creator = {
	gameStart: () => ({
		type: type.GAME_START,
	}),
	gameOver: () => ({
		type: STATUS_TYPES.GAME_OVER,
	}),
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case type.GAME_START:
			return {
				...state,
				status: STATUS_TYPES.STATUS_PLAYING,
			};
		case type.GAME_OVER:
			return {
				...state,
				status: STATUS_TYPES.STATUS_STOP,
			};
		case type.GAME_PAUSE:
			return {
				...state,
				status: STATUS_TYPES.STATUS_PAUSE,
			};
		default:
			return state;
	}
};

export { STATUS_TYPES, creator, reducer };
