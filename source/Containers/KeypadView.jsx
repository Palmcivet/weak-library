import React from "react";

const KeypadView = (props) => {
	return (
		<div className="controller">
			<div className="top">
				<button onClick={this.handleController("up")}>
					<span className="fa fa-angle-double-up"></span>
				</button>
			</div>
			<div className="center">
				<button onClick={this.handleController("left")}>
					<span className="fa fa-angle-double-left"></span>
				</button>
				<button onClick={this.handleController("right")}>
					<span className="fa fa-angle-double-right"></span>
				</button>
			</div>
			<div className="bottom">
				<button onClick={this.handleController("down")}>
					<span className="fa fa-angle-double-down"></span>
				</button>
			</div>
		</div>
	);
};

export { KeypadView };
