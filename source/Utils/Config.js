const DICT = {
	BG_STYLE: ["N", "F", "H"],
	DIR_A: ["U", "D", "L", "R"], // Up / Down / Left / Right
	DIR_B: ["W", "S", "A", "D"], // keyboard
};

const MAP = {
	BG_LINE: 25,
	BG_CELL: 25,
	MINUSCOLOR: 33, // hex
	SPD_SNAKE: 800, // per cell
	SPD_REFRESH: 200, // 0.2s
};

const PREFERENCE = {
	TOGGLE_CHATBOX: true,
	THEME: DICT.THEME.DARK,
};

export { DICT, MAP, PREFERENCE };
