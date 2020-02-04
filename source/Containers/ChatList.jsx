import React from "react";
import { message } from "antd";

/**
 * 消息条目
 * @param {String} name 用户名
 * @param {String} color 颜色，十六进制字符串
 * @param {String} msg 消息
 */
const ChatItem = (name, color, msg) => {
	const itemStyle = {
		listStyle: "none",
		margin: "12px",
	};

	const nameStyle = {
		overflow: "hidden",
		width: "280px",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		display: "block",
		fontSize: "13px",
	};

	const msgStyle = {
		fontSize: "16px",
		backgroundColor: "#87e38799",
		boxShadow: "0px 2px 8px #87e38799",
		borderRadius: "10px",
		fontWeight: 390,
		fontSize: "14px",
		margin: "5px 10px",
		padding: "11px",
	};

	return (
		<li style={itemStyle}>
			<span style={nameStyle}>
				uioUIOui oUIOuioUIOu sdfsdf UIOuioUIOuioUIOuioUIOuioUIOuioUIO"
			</span>
			<p style={msgStyle}>
				通过设置 Button 的属生不同的按钮样式，推荐为 disabled。 按钮的属说明如下
			</p>
		</li>
	);
};

let i = 0;
const msgList = [];
msgList.push(<ChatItem key={i++} />);
msgList.push(<ChatItem key={i++} />);
msgList.push(<ChatItem key={i++} />);
msgList.push(<ChatItem key={i++} />);
msgList.push(<ChatItem key={i++} />);
msgList.push(<ChatItem key={i++} />);

//* TODO: 处理注销未关闭 ws 的问题

const ChatList = (props) => {
	const containerStyle = {
		paddingLeft: "5px",
	};

	msgList.push(props.msg);

	return (
		<ul id="msg-container" style={containerStyle}>
			{msgList}
		</ul>
	);
};

export { ChatList };
