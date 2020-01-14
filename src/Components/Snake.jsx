import { Config } from '../Config'

/**
 * 描述蛇的对象，围绕 body 结构进行操作
 * @param {String} id - 哈希字符串，标识蛇
 * @param {String} color - 字符，标识头的颜色
 * @param {String} initDir - 初始时的方向
 * @param {Array} initBody - 初始时的位置，即头的位置
 */
function Snake(id, color, initDir, initBody) {
    this.id = id
    this.color = color
    this.dir = initDir
    this.head = initBody

    this.body = new Array()
    this.body[0] = []

    /**
     * generate the next position
     * 生成运动过程中的下一个点
     * @returns {Array} - 一维数组，描述下一个点。an object with array
     */
    this.next = () => {
        let next = this.head
        switch (this.dir) {
            case ('U'):
                next[0] = this.head[0] - 1
                break
            case ('D'):
                next[0] = this.head[0] + 1
                break
            case ('L'):
                next[1] = this.head[1] - 1
                break
            case ('R'):
                next[1] = this.head[1] + 1
                break
        }
        return next
    }

    /**
     * @param {String} changeDir - 字符串，要改变的方向。the direction to be changed
     */
    this.Turn = (changeDir) => {
        if ((Config.dirA.indexOf(changeDir) == -1) && (Config.dirB.indexOf(changeDir) == -1)) {
            console.log("Invalid Argument: changeDir")
            return
        }
        this.dir = changeDir
    }

    /**
     * 描述蛇捕获食物的动作，在捕食时触发
     * @returns {Object} - 对象，包含两个元素，分别描述当前头部和尾部的位置。an object with array
     */
    this.Eat = () => {
        let head = __next()
        this.body.reverse()
        this.body.push(head)
        this.body.reverse()
        return {
            head: head,
            next: __next()
        }
    }

    /**
     * 描述蛇的常规移动，周期性触发
     * @returns {Object} - 对象，包含三个数组元素，分别描述下一个位置、当前头部和尾部的位置。an object with array
     */
    this.Move = () => {
        let head = __next()
        this.body.reverse()
        this.body.push(head)
        let tail = this.body.pop()
        this.body.reverse()
        return {
            head: head,
            next: __next(),
            tail: tail
        }
    }
}

export { Snake }