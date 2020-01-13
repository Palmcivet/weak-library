- [Snake](#snake)
    - [文件结构](#文件结构)
    - [Todo](#todo)

## Snake
多人在线贪吃🐍

### 文件结构
- Layouts
    - App：渲染图形界面
    - Controller：控制器
- Components
    - Handler：常用函数
    - Map：构建地图的结构
    - MapGame：注册玩家（对象数组）
    - Snake：构建蛇的对象
    - SnakeGame：，维护玩家的状态（遍历数组以更新）、执行相应动作（定时器轮调，触发移动信号），每次移动比对地图（边界检测）、渲染玩家（更改 `style`）
- Styles
    - index：主样式表
    - variable：变量

### Todo
1. 登录和中途离开（玩家的注册和移除）
2. 碰撞后的通知和处理
3. 组件合并，结构优化
