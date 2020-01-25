import { Config } from "../Utils/Config";

/**
 * 根据头部颜色，计算蛇身体的颜色
 * @param {String} headColor - 十六进制颜色字符串
 * @returns {String} - 转换后的十六进制字符
 */
let changeColor = (headColor) => {
	let bodyColor = parseInt(headColor.slice(1, 3), 16) - Config.minusColor;
	return String("#" + bodyColor);
};

/**
 * 注册后渲染地图，接收对象、节点和颜色
 * @param {Array} map - 三维数组，地图对象
 * @param {Object} player - snake 对象
 * @param {Array} point - 一维数组
 * @param {String} style - 地图上点的类型，用来注册地图
 */
const handleRegister = (map, player, point, style = "N") => {
	// 解析 id
	pointId = Config.bgCell * point[0] + point[1];
	// 添加样式
	if (style != "N") {
		document
			.getElementById(pointId)
			.setAttribute("background-color", changeColor(player.color));
	} else {
		document
			.getElementById(pointId)
			.setAttribute("background-color", "#b3baa7");
	}
	map[point[0]][point[1]][0] = style;

	// 注册玩家
	map[point[0]][point[1]][1] = player.id;
};

/**
 * 解析玩家地图上点的样式
 * @param {Arry} map - 三维数组，最后一维只有两个元素：id 和 style
 * @param {Array} point - 坐标，一维数组，两个元素
 */
const handleParse = (map, point) => {
	return map[point[0]][point[1]][0];
};

/**
 * 控制器，处理键盘事件，以更改方向
 * TODO: 综合处理鼠标事件
 * @param {Object} snake - snake 对象
 * @param {Array} dir - 更改方向
 * @param {Object} timer - 定时器对象，用以调试时取消定时器
 */
const handleController = (snake, dir, timer) => {
	switch (dir) {
		case "w":
			snake.Turn("U");
			break;
		case "s":
			snake.Turn("D");
			break;
		case "a":
			snake.Turn("L");
			break;
		case "d":
			snake.Turn("R");
			break;
		default:
			console.log("Please press WASD or ←→↑↓");
			clearInterval(timer);
	}
};

export { handleRegister, handleParse, handleController };
