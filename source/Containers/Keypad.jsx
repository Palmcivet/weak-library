import React, { Component } from "react";

import { STATUS_TYPES } from "../Data/modules/game";
import { KeypadView } from "./KeypadView";

class Keypad extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// 只有全局 state 在 `PLAYING` 时才监听
		if (props.game.satus == STATUS_TYPES.STATUS_PLAYING) {
			window.addEventListener("keydown", (e) => this.handleKeyboard(e.key));
		}
		console.log("Start listening...");
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", (e) => this.handleKeyboard(e.key));
		console.log("Finish listening.");
	}

	render() {
		return <KeypadView />;
	}
}

export { Keypad };
