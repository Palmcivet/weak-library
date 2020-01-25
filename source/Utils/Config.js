const DICT = {
	BG_STYLE: ["N", "F", "H"],
	DIR_A: ["U", "D", "L", "R"], // Up / Down / Left / Right
	DIR_B: ["W", "S", "A", "D"], // keyboard
};

const MAP = {
	BG_LINE: 25,
	BG_CELL: 25,
	TURN_COLOR: 0.5,
	SPD_SNAKE: 800, // per cell
	SPD_REFRESH: 200, // 0.2s
	FOOD_NUM: 3,
};

const PREFERENCE = {
	CHATBOX: true,
	THEME: DICT.THEME.DARK,
};

export { DICT, MAP, PREFERENCE };
