import { Config } from "../Utils/Config";

/**
 * 此处不处理具体逻辑，仅响应不同事件，统一成一种信号（U/D/L/R）
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

export { handleParse, handleController };
