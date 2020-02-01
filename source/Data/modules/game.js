/**
 * 游戏起止、控制等事务
 */

import { REFERENCE } from "../../Utils/config";

const STATUS_TYPES = {
	PLAYING: "STATUS/PLAYING",
	RESTING: "STATUS/RESTING",
	READY: "STATUS/READY", // 多人的准备状态
	PAUSE: "STATUS/PAUSE", // 单人的暂停状态
};

const MODE_TYPES = {
	SINGLE: "SINGLE",
	MULTI: "MULTI",
};

const initState = {
	status: STATUS_TYPES.RESTING,
	types: MODE_TYPES.MULTI,
	food: [
		[56, "blue"],
		[74, "green"],
	],
};

const type = {
	GAME_OVER: "GAME/OVER",
	GAME_START: "GAME/START",
	GAME_READY: "GAME/READY", // 多人游戏
	GAME_PAUSE: "GAME/PAUSE", // 单人游戏
};

const creator = {
	gameStart: () => ({
		type: type.GAME_START,
	}),
	gameOver: () => ({
		type: type.GAME_OVER,
	}),
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case type.GAME_OVER:
			// 清理地图，报告分数
			document.title = REFERENCE.TITLE;
			return {
				...state,
				status: STATUS_TYPES.READY,
			};
		case type.GAME_START:
			document.title = REFERENCE.TITLE + "游戏进行中...";
			return {
				...state,
				status: STATUS_TYPES.PLAYING,
			};
		case type.GAME_READY:
			document.title = REFERENCE.TITLE + "游戏准备中...";
			return {
				...state,
				status: STATUS_TYPES.READY,
			};
		case type.GAME_PAUSE:
			document.title = REFERENCE.TITLE + "游戏暂停";
			return {
				...state,
				status: STATUS_TYPES.PAUSE,
			};
		default:
			return state;
	}
};

export { STATUS_TYPES, creator, reducer };
