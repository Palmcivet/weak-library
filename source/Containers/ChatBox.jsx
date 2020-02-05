import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { creator as chatCreator, selector as chatSelector } from "../Data/modules/chat";
import { selector as authSelector } from "../Data/modules/auth";

import { ChatList } from "./ChatList";

const ChatBoxView = (props) => {
	const [text, setText] = useState("");

	const handleSend = (msg) => {
		if (msg !== "") {
			props.sendMsg(props.id, msg, props.ws.sendMessage);
			setText("");
		} else {
			message.warning("发送内容为空");
		}
	};

	const boxStyle = {
		height: "calc(100vh - 64px - 24px)",
		maxWidth: "400px",
		display: "grid",
		padding: "24px",
		marginRight: "24px",
		gridRowGap: "0px",
		gridColumnGap: "0px",
		gridTemplateRows: "1fr 40px 80px",
		gridTemplateColumns: "1fr",
		placeContent: "space-between space-between",
		placeItems: "center center",
		border: "1px solid #fdfdfd",
		boxShadow: "rgb(240, 241, 242) 0px 2px 8px",
	};

	const listStyle = {
		gridArea: "1 / 1 / 2 / 2",
		alignSelf: "stretch",
		border: "1px solid rgb(225, 225, 225)",
		padding: "16px",
		borderRadius: "4px",
		width: "100%",
		overflowY: "scroll",
	};

	return (
		<div style={boxStyle}>
			<div style={listStyle}>
				<ChatList />
			</div>

			<div
				style={{
					gridArea: "2 / 1 / 3 / 2",
					placeSelf: "end",
				}}
			>
				<Button type="default" onClick={() => chatCreator.clear()}>
					清除消息
				</Button>
				<Button type="primary" onClick={() => handleSend(text)}>
					发送
				</Button>
			</div>

			<Input.TextArea
				placeholder="祖安大舞台，有🐴你就来"
				value={text}
				onChange={(e) => setText(e.target.value)}
				onPressEnter={() => handleSend(text)}
				autoSize={{ minRows: 3, maxRows: 3 }}
				allowClear
				style={{
					gridArea: "3 / 1 / 4 / 2",
					placeSelf: "end",
					width: "350px",
				}}
			/>
		</div>
	);
};

const mapStateToProps = (state, props) => {
	return {
		id: authSelector.getID(state),
		ws: chatSelector.getWs(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators(chatCreator, dispatch),
	};
};

const ChatBox = connect(mapStateToProps, mapDispatchToProps)(ChatBoxView);

export { ChatBox };
