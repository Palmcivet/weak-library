import { DICT } from "../Utils/Config";

/**
 * @class 描述蛇的对象，围绕 body 数组结构进行操作
 */
class Snake {
	/**
	 * @param {Object} argSnake - 描述蛇初始状态的对象
	 * @param {String} argSnake.id - 哈希字符串，标识蛇
	 * @param {String} argSnake.color - 标识头的颜色
	 * @param {String} argSnake.initDir - 初始时的方向
	 * @param {Array} argSnake.initPos - 初始时的位置，即头的位置
	 */
	constructor(argSnake) {
		this.id = argSnake.id;
		this.color = argSnake.color;
		this.dir = argSnake.initDir;
		this.head = argSnake.initPos;
		this.body = new Array();
		this.body[0] = []; // 一维数组，描述身体的每个点
	}

	/**
	 * 生成运动过程中的下一个点
	 * @returns {Array} 一维数组，描述下一个点
	 */
	__next = () => {
		let next = this.head;
		switch (this.dir) {
			case "U":
				next[0] = this.head[0] - 1;
				break;
			case "D":
				next[0] = this.head[0] + 1;
				break;
			case "L":
				next[1] = this.head[1] - 1;
				break;
			case "R":
				next[1] = this.head[1] + 1;
				break;
		}
		return next;
	};

	/**
	 * 描述蛇转向的动作
	 * @param {String} argChgDir - 要改变的方向
	 */
	Turn = (argChgDir) => {
		if (
			DICT.DIR_A.indexOf(argChgDir) == -1 &&
			DICT.DIR_B.indexOf(argChgDir) == -1
		) {
			console.log("Invalid Argument: changeDir");
			return;
		}
		this.dir = argChgDir;
	};

	/**
	 * 描述蛇捕获食物的动作，在捕食时触发
	 * @returns {Object} {head: }，分别描述当前头部和尾部的位置
	 */
	Eat = () => {
		let head = __next();
		this.body.reverse();
		this.body.push(head);
		this.body.reverse();
		return {
			head: head,
			next: __next(),
		};
	};

	/**
	 * 描述蛇的常规移动，周期性触发
	 * @returns {Object} - 对象，包含三个数组元素，分别描述下一个位置、当前头部和尾部的位置
	 */
	Move = () => {
		let head = __next();
		this.body.reverse();
		this.body.push(head);
		let tail = this.body.pop();
		this.body.reverse();
		return {
			head: head,
			next: __next(),
			tail: tail,
		};
	};
}

export { Snake };
