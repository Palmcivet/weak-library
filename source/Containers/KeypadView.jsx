import React from "react";

import { Game } from "../Game/Game";

let testPlayerChain = [
	{
		id: "3d4ca1",
		color: "#ee7744",
		initDir: "L",
		initPos: [13, 4],
	},
];

const KeypadView = (props) => {
	return (
		<div className="controller">
			<button
				onClick={() => {
					const newGame = new Game(testPlayerChain);
					newGame.start();
				}}
			>
				Start
			</button>
			<div className="top">
				<button>
					<span className="fa fa-angle-double-up"></span>
				</button>
			</div>
			<div className="center">
				<button>
					<span className="fa fa-angle-double-left"></span>
				</button>
				<button>
					<span className="fa fa-angle-double-right"></span>
				</button>
			</div>
			<div className="bottom">
				<button>
					<span className="fa fa-angle-double-down"></span>
				</button>
			</div>
		</div>
	);
};

export { KeypadView };
