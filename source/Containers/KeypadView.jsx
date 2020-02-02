import React from "react";
import { Button } from "antd";

const KeypadView = (props) => {
	return (
		<div className="controller">
			<Button>Start</Button>
			<div className="key top">
				<button>
					<span className="fa fa-angle-double-up"></span>
				</button>
			</div>
			<div className="key center">
				<button>
					<span className="fa fa-angle-double-left"></span>
				</button>
				<button>
					<span className="fa fa-angle-double-right"></span>
				</button>
			</div>
			<div className="key bottom">
				<button>
					<span className="fa fa-angle-double-down"></span>
				</button>
			</div>
		</div>
	);
};

export { KeypadView };
