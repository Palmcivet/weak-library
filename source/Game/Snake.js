import { DICT, MAP } from "../Utils/Config";

/**
 * @class 描述蛇的对象，只提供对外接口，逻辑判断在 `Game` 对象
 */
class Snake {
	/**
	 * @param {Object} argSnake - 描述蛇初始状态的对象
	 * @param {String} argSnake.id - 哈希字符串，标识蛇
	 * @param {String} argSnake.color - 标识头的颜色
	 * @param {String} argSnake.initDir - 初始时的方向
	 * @param {Array} argSnake.initPos - 含 2 个元素，初始时的位置，即头的位置
	 */
	constructor(argSnake) {
		this.id = argSnake.id;
		this.color = argSnake.color;
		this.dir = argSnake.initDir;
		this.head = argSnake.initPos;
		this.next = this._next(this.head);

		// TODO
		this.body = new Array();
		this.body[0] = this.head; // 一维数组，描述身体的每个点
		this.mark = 0;
	}

	/**
	 * 计算运动过程中的下一个点，没有副作用
	 * @returns {Array} 一维数组，描述下一个点
	 */
	_next = (argHead) => {
		let rtnNext = new Array();
		rtnNext = Object.assign(rtnNext, argHead);

		switch (this.dir) {
			case "U":
				rtnNext[0] = rtnNext[0] - 1;
				break;
			case "D":
				rtnNext[0] = rtnNext[0] + 1;
				break;
			case "L":
				rtnNext[1] = rtnNext[1] - 1;
				break;
			case "R":
				rtnNext[1] = rtnNext[1] + 1;
				break;
		}

		// 边界检测，失败返回 "ERROR"，成功返回坐标数组
		if (!MAP.BOUNDARY) {
			// 循环边界
			rtnNext[0] = (MAP.BG_LINE + rtnNext[0]) % MAP.BG_LINE;
			rtnNext[1] = (MAP.BG_CELL + rtnNext[1]) % MAP.BG_CELL;
			console.log(rtnNext);
		} else {
			// 固定边界
			if (
				rtnNext[0] < 0 ||
				rtnNext[1] < 0 ||
				rtnNext[0] >= MAP.BG_LINE ||
				rtnNext[1] >= MAP.BG_CELL
			) {
				return "ERROR";
			}
		}

		return rtnNext;
	};

	/**
	 * 描述蛇转向的动作
	 * @param {String} argChgDir - 要改变的方向
	 */
	turn = (argChgDir) => {
		if (DICT.DIR_A.indexOf(argChgDir) == -1 && DICT.DIR_B.indexOf(argChgDir) == -1) {
			console.log("Invalid Argument: changeDir");
			return;
		}
		this.dir = argChgDir;
	};

	/**
	 * 描述蛇捕获食物的动作，在捕食时触发
	 * @returns {Object} {head: }，分别描述当前头部和尾部的位置
	 */
	catch = () => {
		this.head = this._next(this.head);
		this.body.reverse();
		this.body.push(this.head);
		this.body.reverse();
		this.next = this._next(this.head);

		return this.head;
	};

	/**
	 * 描述蛇的常规移动，周期性触发
	 * @returns {Object} - 对象，包含三个数组元素，分别描述下一个位置、当前头部和尾部的位置
	 */
	move = () => {
		this.head = this.next;

		this.body.reverse();
		this.body.push(this.head);
		this.body.reverse();
		let tail = this.body.pop();
		this.next = this._next(this.head);

		return tail;
	};
}

export { Snake };
