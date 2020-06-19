import { MAP } from "../Utils/config";
import { chgMode } from "../Utils/color";

const initColor = {
	// 获取随机 HSL
	randHSL: () => {
		var H = Math.random();
		var S = Math.random();
		var L = Math.random();
		return [H, S, L];
	},

	hue2Rgb: (p, q, t) => {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	},

	/**
	 * HSL 颜色值转换为 RGB
	 * H，S，L 设定在 [0, 1] 之间
	 * R，G，B 返回在 [0, 255] 之间
	 * @param {Number} H - 色相
	 * @param {Number} S - 饱和度
	 * @param {Number} L - 亮度
	 * @returns RGB 色值数组
	 */
	HSL2RGB: (H, S, L) => {
		let R, G, B;
		if (+S === 0) {
			R = G = B = L; // 饱和度为 0 为灰色
		} else {
			var Q = L < 0.5 ? L * (1 + S) : L + S - L * S;
			var P = 2 * L - Q;
			R = initColor.hue2Rgb(P, Q, H + 1 / 3);
			G = initColor.hue2Rgb(P, Q, H);
			B = initColor.hue2Rgb(P, Q, H - 1 / 3);
		}
		return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
	},

	/**
	 * 获取HSL数组
	 * @param {Number} argHslNum - 生成的 HSL 数组数量，默认 1
	 * @returns {Array} HSL 数值数组
	 */
	getHSLArray: (argHslNum = 1) => {
		let HSL = [];
		for (var i = 0; i < argHslNum; i++) {
			var ret = initColor.randHSL();

			// 颜色相邻颜色差异须大于 0.25
			if (i > 0 && Math.abs(ret[0] - HSL[i - 1][0]) < 0.25) {
				i--;
				continue; // 重新获取随机色
			}
			ret[1] = 0.7 + ret[1] * 0.2; // [0.7 - 0.9] 排除过灰颜色
			ret[2] = 0.4 + ret[2] * 0.4; // [0.4 - 0.8] 排除过亮过暗色

			// 数据转化到小数点后两位
			ret = ret.map((item) => parseFloat(item.toFixed(2)));

			HSL.push(ret);
		}
		return HSL;
	},
};

const randPosition = () => {
	return [
		Math.round(Math.random() * (MAP.BG_LINE - 1)),
		Math.round(Math.random() * (MAP.BG_CELL - 1)),
	];
};

const randColor = () => {
	return chgMode.Rgb2Hex(
		...initColor.getHSLArray().map((item) => initColor.HSL2RGB(...item))[0]
	);
};

const genFood = (argNum = 1) => {
	// TODO: 一次性生成，避免重复
	let rtnFood = [];
	for (let i = 0; i < argNum; i++) {
		rtnFood.push({
			color: randColor(),
			position: randPosition(),
		});
	}
	// *===========================

	return {
		color: randColor(),
		position: randPosition(),
	};
};

export { genFood };
