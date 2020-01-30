import React, { useState } from "react";
import { Button, Input, Icon } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { creator as chatCreator, selector as chatSelector } from "../Data/modules/chat";

const ChatBoxView = (props) => {
	const [text, setText] = useState("");

	return (
		<div>
			<Input
				placeholder="祖安大舞台，有🐴你就来"
				value={text}
				onChange={(e) => setText(e.target.value)}
				onPressEnter={() => props.send(text)}
				allowClear
			/>
			<Button
				type="primary"
				onClick={() => props.send(text)}
				loading={props.loading}
			>
				发送
				<Icon type="check-circle" theme="twoTone" />
			</Button>
		</div>
	);
};

const mapStateToProps = (state, props) => {
	return {
		loading: chatSelector.getLoading(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators(chatCreator, dispatch),
	};
};

const ChatBox = connect(mapStateToProps, mapDispatchToProps)(ChatBoxView);

export { ChatBox };
