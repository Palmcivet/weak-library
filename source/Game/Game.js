import { Snake } from "./Snake";
import { genTable } from "../Utils/Table";
import { MAP } from "../Utils/Config";
import { handleRegister, handleParse } from "./Handler";

let testPlayerChain = new Game([
	{
		id: "3d4ca1",
		color: "#00FF00",
		initDir: "L",
		initPos: [13, 12],
	},
	{
		id: "4d7c1a",
		color: "#11AA33",
		initDir: "U",
		initPos: [23, 18],
	},
	{
		id: "4d7c1a",
		color: "#11AA33",
		initDir: "U",
		initPos: [23, 18],
	},
]);

testPlayerChain.start();

class Game {
	constructor(argPlayerArr) {
		let snakeChain = [];
		argPlayerArr.map((argSnake) => snakeChain.push(new Snake(argSnake)));
		this.playerChain = snakeChain;
		this.playerMap = genTable(["N", ""]);
	}

	/**
	 * 蛇死亡时，将之中移除
	 * @param {Object} argDelPlayer - 要移除的玩家
	 */
	delPlayer = (argDelPlayer) => {
		this.playerChain.forEach((argPlayer, index) => {
			if (argPlayer["id"] === argDelPlayer["id"]) {
				delete this.playerChain[index];
			}
		});
	};

	/**
	 * 常规移动，每次移动进行判断
	 */
	start = () =>
		setInterval(
			() =>
				playerChain.forEach((eachPlayer) => {
					moveJudge(eachPlayer);
				}),
			MAP.SPD_SNAKE
		);

	/**
	 * 移动检测，有如下步骤：
	 * 1. 根据下一位置进行判断：
	 *      - 移动，返回头尾位置，头部添加颜色，尾部移除颜色
	 *      - 捕获，返回头部位置，只添加颜色，不移除（即变长）
	 *      - 碰撞
	 * 2. 地图上进行相应绘制
	 * @param {Object} player - 蛇的对象
	 */
	moveJudge = (player) => {
		switch (handleParse(playerMap, player.next)) {
			case "N":
				handleRegister(playerMap, player, player.Move().next, "H");
				handleRegister(playerMap, player, player.Move().head, "B");
				handleRegister(playerMap, player, player.Move().tail, "N");
				break;
			case "F":
				handleRegister(playerMap, player, player.Move().next, "H");
				handleRegister(playerMap, player, player.Move().head, "B");
				break;
			default:
				break;
		}
	};
}

export { Game };
