import React from "react";
import { Button } from "antd";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { notification } from "antd";
import { bindActionCreators } from "redux";

import { ChatBox } from "../Containers/ChatBox";
import { Console } from "../Containers/Console";
import { selector as authSelector } from "../Data/modules/auth";

const openNotification = (title, msg) => {
	notification.open({
		message: title || "Notification Title",
		description: msg || "This is the content of the notification.",
		onClick: () => {
			console.log("Notification Clicked!");
		},
		placement: "topLeft",
		top: 76,
		style: {
			width: 200,
			marginLeft: 0,
		},
	});
};

const Notify = (props) => (
	<Button type="primary" onClick={() => openNotification()}>
		Open Box
	</Button>
);

const GameView = (props) => {
	const { location } = props;

	if (props.id === null) {
		return <Redirect to={{ pathname: "/auth", state: { from: location } }} />;
	}

	return (
		<>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "300px 1.2fr, 0.8fr",
					gridTemplateRows: "1fr",
					gridColumnGap: "0px",
					gridRowGap: "0px",
					placeContent: "space-between space-between",
					placeItems: "center center",
				}}
			>
				<div
					style={{
						gridArea: "1 / 1 / 2 / 2",
						height: "auto",
						placeSelf: "start center",
					}}
				>
					<Notify />
				</div>

				<main
					style={{
						gridArea: "1 / 2 / 2 / 3",
						height: "auto",
						placeSelf: "center",
					}}
				>
					<Console />
				</main>

				<aside
					style={{
						gridArea: "1 / 3 / 2 / 4",
						height: "auto",
						placeSelf: "stretch end",
					}}
				>
					<ChatBox />
				</aside>
			</div>
		</>
	);
};

const mapStateToProps = (state, props) => {
	return {
		id: authSelector.getID(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

const Game = connect(mapStateToProps, mapDispatchToProps)(GameView);

export { Game };
