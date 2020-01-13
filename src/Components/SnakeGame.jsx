import { Config } from '../Config'
import { Snake } from './Snake'
import { handleRegister, handleParse } from './Handler'

const Table = () => {
    let table = new Array()
    for (let i = 0; i < Config.bgLine; i++) {
        table[i] = new Array();
        for (let j = 0; j < Config.bgCell; j++) {
            table[i][j] = ['N', ''];
        }
    }
    return table
}

function Player(snake) {
    let playerChain = new Array(new Snake(snake))
    let playerMap = new Table()

    /**
     * 当玩家进入，执行相应操作
     * @param {Object} addSnake - 要添加的玩家
     */
    this.addPlayer = (addSnake) => (
        playerChain.push(new Snake(addSnake))
    )

    /**
     * 当玩家离开，将玩家从 playerChain 中移除
     * @param {Object} delSnake - 要移除的玩家
     */
    this.delPlayer = (delSnake) => (
        pass
    )

    /**
     * 常规移动，每次移动进行判断：检测是否撞墙或重合
     */
    this.start = () => (
        setInterval(
            () => (
                playerChain.forEach((eachPlayer) => {
                    moveJudge(eachPlayer)
                })
            ),
            Config.spdSnake
        )
    )

    /**
     * 移动检测，有如下步骤：
     * 1. 根据下一位置进行判断：
     *      - 移动，返回头尾位置，头部添加颜色，尾部移除颜色
     *      - 捕获，返回头部位置，只添加颜色，不移除（即变长）
     *      - 碰撞
     * 2. 地图上进行相应绘制
     * @param {Object} player - 蛇的对象
     */
    let moveJudge = (player) => {
        switch (handleParse(playerMap, player.next)) {
            case 'N':
                handleRegister(playerMap, player, player.Move().next, 'H')
                handleRegister(playerMap, player, player.Move().head, 'B')
                handleRegister(playerMap, player, player.Move().tail, 'N')
                break
            case 'F':
                handleRegister(playerMap, player, player.Move().next, 'H')
                handleRegister(playerMap, player, player.Move().head, 'B')
                break
            default:
                break
        }
    }
    return playerChain
}
export { Player }