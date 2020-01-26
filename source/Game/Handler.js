import { Config } from "../Utils/Config";

/**
 * 此处不处理具体逻辑，仅响应不同事件，统一成一种信号
 * @param {String} argDir
 */
let handleKeyboard = (argDir) => {
	console.log(argDir);
	switch (argDir) {
		case "ArrowUp" || "w" || "W":
			dispatch();
			break;
		case "ArrowDown" || "s" || "S":
			break;
		case "ArrowLeft" || "a" || "A":
			break;
		case "ArrowRight" || "d" || "D":
			break;
		default:
			break;
	}
};

/**
 * 控制器，处理键盘事件，以更改方向
 * @param {Object} snake - snake 对象
 * @param {Array} dir - 更改方向
 */
const handleController = (snake, dir) => {
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
			// TODO: dispatch 一个 notify 信号
			console.log("Please press WASD or ←→↑↓");
	}
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

export { handleRegister, handleParse, handleController };
