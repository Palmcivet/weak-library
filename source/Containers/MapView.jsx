import React from "react";

import { Config } from "../Utils/Config";

let mapTable = new Array();
for (let i = 0; i < Config.bgLine; i++) {
	mapTable[i] = new Array();
	for (let j = 0; j < Config.bgCell; j++) {
		mapTable[i][j] = Config.bgStyle[0];
	}
}

let id = 0;
const Map = () => (
	<div className="bg-map">
		{mapTable.map((items, line) => (
			<div className="line" key={line}>
				{items.map((item, index) => (
					<div className="cell" key={index} id={id++}></div>
				))}
			</div>
		))}
	</div>
);

export { Map };
