import { combineReducers } from "redux";

import { reducer as playerReducer } from "./modules/player";
import { reducer as notifyReducer } from "./modules/notify";
import { reducer as systemReducer } from "./modules/system";
import { reducer as loginReducer } from "./modules/login";
import { reducer as gameReducer } from "./modules/game";
import { reducer as chatReducer } from "./modules/chat";

const state = {
	login: {
		status: "NOTIFY/STATUS/LOGIN",
		id: "2e45af",
		name: "uio",
		notify: {
			status: "NOTIFY/STATUS/SUCCESS",
			msg: "登陆成功",
		},
	},
	system: {
		chatbox: true,
		theme: dark,
		map: 50,
	},
	game: {
		status: "NOTIFY/STATUS/PLAYING",
		food: {
			color: [100, 100, 100],
			pssition: 1,
		},
	},
	chat: {
		notify: {
			status: "NOTIFY/STATUS/SUCCESS",
			sndMsg: "again.",
			rcvMsg: "OK.",
		},
		content: ["ahhh", "yyy", "I won.", "again"],
		id: ["2e45af", "7f4d2e", "7f4d2e", "5f5a3d"],
	},
	player: [
		{ id: "2e45af", dir: "U", valid: 1 },
		{ id: "7f4d2e", dir: "L", valid: 20 },
		{ id: "5f5a3d", dir: "L", valid: 70 },
	],
};

const rootReducers = combineReducers({
	playerReducer,
	notifyReducer,
	systemReducer,
	loginReducer,
	gameReducer,
	chatReducer,
});

export { rootReducers };
