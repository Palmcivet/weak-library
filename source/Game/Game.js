import { Snake } from "./Snake";
import { handleParse } from "./Handler";
import { genTable } from "../Utils/Table";
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
			rtnPlayerMap[(argSnake.head[0], argSnake.head[1])][0] = argSnake.id;
			this._handleColor(argSnake.head, argSnake.color);
		});

		this.playerChain = rtnPlayerChain;
		this.playerMap = rtnPlayerMap;
	}

	/**
	 * 地图着色，根据标识选取
	 * @param {Array} argPoint - 一维数组，含 2 个元素，标识位置坐标
	 * @param {String} argColor - 字符串，表示颜色
	 */
	_handleColor = (argPoint, argColor) => {
		let pos = argPoint[0] * MAP.BG_LINE + argPoint[1];
		document
			.getElementById(pos.toString())
			.getAttributeNode("style").value = argColor;
	};

	/**
	 * 蛇死亡时，将之中移除
	 * @param {Object} argDelPlayer - 要移除的玩家
	 */
	_delPlayer = (argDelPlayer) => {
		this.playerChain.forEach((argPlayer, index) => {
			if (argPlayer["id"] === argDelPlayer["id"]) {
				delete this.playerChain[index];
			}
		});
	};

	/**
	 * 移动检测：
	 *     - 移动，返回头尾位置，头部添加颜色，尾部移除颜色
	 *     - 捕获，返回头部位置，只添加颜色，不移除（即变长）
	 *     - 碰撞
	 * @param {Object} argSnake - 蛇的对象
	 */
	_handleMove = (argSnake) => {
		if (
			argSnake.id ===
			this.playerMap[(argSnake.next[0], argSnake.next[1])][0]
		) {
			let tail = argSnake.move();
			this._handleColor(argSnake.head, argSnake.color);
			this._handleColor(tail, MAP.BG_STYLE);
		} else if (
			this.playerMap[(argSnake.next[0], argSnake.next[1])][1] !== null
		) {
			argSnake.catch();
			this._handleColor(argSnake.head, argSnake.color);
			this.playerMap[(argSnake.next[0], argSnake.next[1])][1] = null;
		} else {
			this._delPlayer(argSnake);
			// TODO
			window.removeEventListener("keydown", (e) =>
				this.handleKeyboard(e.key)
			);
			console.log("Finish listening.");
			alert("Game Over");
		}
	};

	/**
	 * 常规移动，每次移动进行判断
	 */
	start = (argSig) => {

		// TODO: 验证函数内，返回一个定时器前监听事件，能否成功改变参数
		if (props.game.satus == STATUS_TYPES.STATUS_PLAYING) {
			window.addEventListener("keydown", (e) =>
				this.handleKeyboard(e.key)
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
