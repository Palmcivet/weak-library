import React from "react";
import styled from "styled-components";

import { genTable } from "../Utils/table";
import { MAP } from "../Utils/config";

const BgMap = styled.div`
	width: 450px;
	height: 450px;
	margin: auto;
	// background: #98a08b;
	background: #9ead86;
`;

const Line = styled.div`
	height: 4%;
`;

const Cell = styled.div`
	& {
		width: 4%;
		height: 100%;
		float: left;
		padding: 1px;
		border: 1px solid #8e957d;
	}

	&:after {
		content: "";
		display: block;
		width: 13px;
		height: 13px;
		background-color: #879372;
	}
`;

let mapTable = genTable();
let id = 0;

const MapView = (props) => {
	return (
		<BgMap>
			{mapTable.map((items, line) => (
				<Line key={line}>
					{items.map((item, cell) => (
						<Cell
							key={cell}
							id={id++}
							style={{ backgroundColor: MAP.BG_STYLE }}
						></Cell>
					))}
				</Line>
			))}
		</BgMap>
	);
};

export { MapView };
