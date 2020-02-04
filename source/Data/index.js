import { combineReducers } from "redux";

import { reducer as authReducer } from "./modules/auth";
import { reducer as gameReducer } from "./modules/game";
import { reducer as chatReducer } from "./modules/chat";

const rootReducers = combineReducers({
	auth: authReducer,
	chat: chatReducer,
	game: gameReducer,
});

export { rootReducers };
