import React from "react";

import { genTable } from "../Utils/Table";
import { MAP } from "../Utils/Config";

import "./map.less";

let mapTable = genTable();
let id = 0;

const MapView = () => (
	<div className="bg-map">
		{mapTable.map((items, line) => (
			<div className="line" key={line}>
				{items.map((item, cell) => (
					<div
						className="cell"
						key={cell}
						id={id++}
						style={{ backgroundColor: MAP.BG_STYLE }}
					></div>
				))}
			</div>
		))}
	</div>
);

export { MapView };
