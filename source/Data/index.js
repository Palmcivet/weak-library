import { combineReducers } from "redux";

import { reducer as notifyReducer } from "./modules/notify";
import { reducer as authReducer } from "./modules/auth";
import { reducer as gameReducer } from "./modules/game";
import { reducer as chatReducer } from "./modules/chat";

const rootReducers = combineReducers({
	notify: notifyReducer,
	auth: authReducer,
	chat: chatReducer,
	game: gameReducer,
});

export { rootReducers };
