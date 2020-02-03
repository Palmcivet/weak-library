const DICT = {
	DIR_A: ["U", "D", "L", "R"], // Up / Down / Left / Right
	DIR_B: ["W", "S", "A", "D"], // keyboard
};

const MAP = {
	BG_LINE: 25,
	BG_CELL: 25,
	TURN_COLOR: 0.5, // 蛇身体和头部计算差
	SPD_SNAKE: 600, // 移动速度
	SPD_REFRESH: 200, // 0.2s
	FOOD_NUM: 3, //食物数量
	BG_STYLE: "#9fa592", // 地图背景色
	BOUNDARY: true, // 是否存在边界
};

const REFERENCE = {
	TITLE: "🐍",
};

const PREFERENCE = {
	CHATBOX: true,
	THEME: "DARK",
};

export { DICT, MAP, REFERENCE, PREFERENCE };
