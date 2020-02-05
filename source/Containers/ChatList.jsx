import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { creator as chatCreator, selector as chatSelector } from "../Data/modules/chat";

/**
 * 消息条目
 * @param {String} argName 用户名
 * @param {String} argColor 颜色，十六进制字符串
 * @param {String} argMsg 消息
 */
const ChatItem = (props) => {
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

	let { children } = props;
	// TODO: color
	// childred[2]

	return (
		<li style={itemStyle}>
			<span style={nameStyle}>{children[0]}</span>
			<p style={msgStyle}>{children[1]}</p>
		</li>
	);
};

const ChatListView = (props) => {
	const containerStyle = {
		paddingLeft: "5px",
	};

	let { msg, user } = props;

	return (
		<ul id="msg-container" style={containerStyle}>
			{msg.map((item, index) => {
				if (!user.hasOwnProperty(item[0])) {
					return <ChatItem key={index}>{["系统消息", item[1]]}</ChatItem>;
				}
				return (
					<ChatItem key={index}>
						{[user[item[0]][0], item[1], user[item[0]][1]]}
					</ChatItem>
				);
			})}
		</ul>
	);
};

const mapStateToProps = (state, props) => {
	return {
		msg: chatSelector.getMsg(state),
		user: chatSelector.getUser(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators(chatCreator, dispatch),
	};
};

const ChatList = connect(mapStateToProps, mapDispatchToProps)(ChatListView);

export { ChatList };
