import { Snake } from "./Snake";
import { genTable } from "../Utils/Table";
import { genFood } from "../Utils/Rand";
import { Timer } from "../Utils/Timer";
import { MAP } from "../Utils/Config";

/**
 * @class 描述一局游戏
 */
class Game {
	/**
	 * 对外暴露 `start()` 方法
	 * 生成 `playerChain` 数组，每个元素为 Snake 对象
	 * 生成 `playerMap` 三维数组，前两维描述地图，最后一维注册玩家或食物
	 * 默认为地图，因此最后一维数组最少有两个元素：
	 *     - `[0]`：哈希字符串，玩家 ID
	 *	   - `[1]`：字符串，标识食物
	 * @param {Array} argPlayerArr - 解析 request 得到的玩家数组，由 Object 构成
	 */
	constructor(argPlayerArr) {
		let rtnPlayerChain = [];
		let rtnPlayerMap = genTable(["", ""]);

		argPlayerArr.map((argSnake) => {
			rtnPlayerChain.push(new Snake(argSnake));
			rtnPlayerMap[argSnake.initPos[0]][argSnake.initPos[1]][0] = argSnake.id;
			this._handleColor(argSnake.initPos, argSnake.color);
		});

		// *TEST
		console.log(rtnPlayerChain);

		this.playerChain = rtnPlayerChain;
		this.playerMap = rtnPlayerMap;
	}

	/**
	 * 玩家死亡时，将之移除
	 * @param {Object} argDelPlayer - 要移除的玩家
	 */
	_gameOver = (argDelPlayer) => {
		this.playerChain.forEach((argPlayer, index) => {
			if (argPlayer["id"] === argDelPlayer["id"]) {
				delete this.playerChain[index];
			}
		});
		window.removeEventListener("keydown", (e) => this.handleKeyboard(e.key));
		console.log("Finish listening.");

		// TODO: 添加游戏结束的效果
		// alert("Game Over");
	};

	/**
	 * 地图着色，根据标识选取
	 * @param {Array} argPoint - 一维数组，含 2 个元素，标识位置坐标
	 * @param {String} argColor - 字符串，表示颜色
	 */
	_handleColor = (argPoint, argColor) => {
		let pos = argPoint[0] * MAP.BG_LINE + argPoint[1];
		let color = "background-color: " + argColor;

		document.getElementById(pos.toString()).setAttribute("style", color);
	};

	/**
	 * 移动检测：
	 *     - 移动，返回头尾位置，头部添加颜色，尾部移除颜色
	 *     - 捕获，返回头部位置，只添加颜色，不移除（即变长）
	 *     - 碰撞
	 * @param {Object} argSnake - 蛇的对象
	 */
	_handleMove = (argSnake) => {
		if (argSnake.next !== "ERROR") {
			if (
				// 是自己
				this.playerMap[argSnake.next[0]][argSnake.next[1]][0] === argSnake.id ||
				// 无食物
				this.playerMap[argSnake.next[0]][argSnake.next[1]][1] === ""
			) {
				let tail = argSnake.move();

				this.playerMap[argSnake.head[0]][argSnake.head[1]][0] = argSnake.id;
				this._handleColor(argSnake.head, argSnake.color);

				this.playerMap[tail[0]][tail[1]][0] = "";
				this._handleColor(tail, MAP.BG_STYLE);
			} else if (
				// 有食物
				this.playerMap[argSnake.next[0]][argSnake.next[1]][1] !== ""
			) {
				argSnake.catch();
				this.playerMap[argSnake.head[0]][argSnake.head[1]][0] = argSnake.id;
				this._handleColor(argSnake.head, argSnake.color);
				this.playerMap[argSnake.next[0]][argSnake.next[1]][1] = "";
				argSnake.mark += 1;

				// 生成食物
				let { color, position } = genFood(1);
				console.log("食物：", color, position);
				this._handleColor(position, color);
				this.playerMap[(position[0], position[1])][1] = color;
			} else {
				this._gameOver(argSnake);
			}
		} else {
			this._gameOver(argSnake);
		}
	};

	/**
	 * @param {Object} argSnake - 蛇对象
	 * @param {String} argDir - 方向（U/D/L/R）
	 */
	_handleKeyboard = (argSnake, argDir) => {
		console.log(argDir);
		switch (argDir) {
			case "ArrowUp" || "w" || "W":
				argSnake.dir = "U";
				break;
			case "ArrowDown" || "s" || "S":
				argSnake.dir = "D";
				break;
			case "ArrowLeft" || "a" || "A":
				argSnake.dir = "L";
				break;
			case "ArrowRight" || "d" || "D":
				argSnake.dir = "R";
				break;
			default:
				break;
		}
	};

	/**
	 * 常规移动，每次移动进行判断
	 */
	start = () => {
		// if (props.game.satus == STATUS_TYPES.STATUS_PLAYING) {
		if (true) {
			window.addEventListener("keydown", (e) =>
				this._handleKeyboard(this.playerChain[0], e.key)
			);
		}
		console.log("Start listening...");

		return Timer(
			() =>
				this.playerChain.forEach((eachPlayer) => {
					this._handleMove(eachPlayer);
				}),
			MAP.SPD_SNAKE
		);
	};
}

export { Game };
