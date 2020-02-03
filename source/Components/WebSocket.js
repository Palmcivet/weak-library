/**
 * @class 封装一个 WebSocket 类
 */
class WebSocket {
	/**
	 * @param {Object} param 回调函数与相关信息
	 * @param {Function} param.socketOnOpen 连接打开
	 * @param {Function} param.socketOnClose 连接关闭
	 * @param {Function} param.socketOnMessage 收到消息
	 * @param {Function} param.socketOnError  连接错误
	 * @param {Number} param.timeout 超时时间
	 * @param {String} param.socketUrl URL
	 */
	constructor(param = {}) {
		this.param = param;
		this.reconnectCount = 5;
		this.socket = null;
		this.taskRemindInterval = null;
		this.isSucces = true;
	}

	connection = () => {
		let { socketUrl, timeout = 5000 } = this.param;

		this.socket = new WebSocket(socketUrl);

		this.socket.onopen = this.onOpen;
		this.socket.onclose = this.onClose;
		this.socket.onerror = this.onError;
		this.socket.onmessage = this.onMessage;
		this.socket.sendMessage = this.sendMessage;

		// 如果 socket.readyState 不等于 1 则连接失败，关闭连接
		if (timeout) {
			let time = setTimeout(() => {
				if (this.socket && this.socket.readyState !== 1) {
					this.socket.close();
					console.warn("Connection Timeout");
				}
				clearInterval(time);
			}, timeout);
		}
	};

	onOpen = () => {
		this.isSucces = false; // 连接成功将标识符改为 false
		console.log("WebSocket Open");

		let { socketOnOpen } = this.param;
		socketOnOpen && socketOnOpen();
	};

	onClose = (e) => {
		this.isSucces = true; // 连接关闭将标识符改为 true
		console.log("Web Socket Close");

		let { socketOnClose } = this.param;
		socketOnClose && socketOnClose(e);

		//! TODO: 根据后端返回的状态码做操作
		if (e.code == "4500") {
			this.socket.close();
		} else {
			this.taskRemindInterval = setInterval(() => {
				if (this.isSucces && this.reconnectCount > 0) {
					this.connection();
					this.reconnectCount--;
				} else {
					clearInterval(this.taskRemindInterval);
				}
			}, 10000);
		}
	};

	onError = (e) => {
		this.socket = null;

		let { socketError } = this.param;
		socketError && socketOnError(e);
	};

	onMessage = (msg) => {
		let { socketOnMessage } = this.param;
		socketONMessage && socketOnMessage(msg);

		//* TEST
		console.log(msg);
	};

	sendMessage = (data) => {
		if (this.socket) {
			this.socket.send(JSON.stringify(data));
			console.log(data);
		}
	};

	heartCheck() {
		// 心跳机制的时间可以自己与后端约定
		this.pingPong = "ping"; // ws的心跳机制状态值
		this.pingInterval = setInterval(() => {
			// 检查 ws 为链接状态 才可发送
			if (this.ws.readyState === 1) {
				this.ws.send("ping"); // 客户端发送ping
			}
		}, 10000);

		this.pongInterval = setInterval(() => {
			this.pingPong = false;
			if (this.pingPong === "ping") {
				this.closeHandle("pingPong没有改变为pong"); // 没有返回pong 重启webSocket
			}
			// 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启
			console.log("返回pong");
			this.pingPong = "ping";
		}, 20000);
	}
}

export { WebSocket };
