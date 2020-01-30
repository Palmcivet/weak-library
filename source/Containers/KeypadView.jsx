import React from "react";
import { Button } from "antd";

let testPlayerChain = {
	id: "3d4ca1",
	color: "#ee7744",
	initDir: "L",
	initPos: [13, 4],
};

const KeypadView = (props) => {
	return (
		<div className="controller">
			<Button>Start</Button>
			<div className="top">
				<Button>
					<span className="fa fa-angle-double-up"></span>
				</Button>
			</div>
			<div className="center">
				<Button>
					<span className="fa fa-angle-double-left"></span>
				</Button>
				<Button>
					<span className="fa fa-angle-double-right"></span>
				</Button>
			</div>
			<div className="bottom">
				<Button>
					<span className="fa fa-angle-double-down"></span>
				</Button>
			</div>
		</div>
	);
};

export { KeypadView };
