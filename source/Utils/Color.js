const randColor = () => {
	return (
		"#" +
		("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
	);
};

const chgMode = {
	/**
	 * @param {String} color - 待测试字符串
	 */
	testMode: (color) => {
		let r = /^\#?[0-9a-f]{6}$/;
		if (!r.test(color)) {
			console.log("错误的 hex 颜色值");
			return false;
		} else return true;
	},
	Hex2Rgb: (str) => {
		let r = /^\#?[0-9a-f]{6}$/;

		if (!r.test(str)) {
			return window.alert("输入错误的hex颜色值");
		}

		str = str.replace("#", "");
		let hxs = str.match(/../g);
		alert("bf" + hxs);
		for (let i = 0; i < 3; i++) {
			hxs[i] = parseInt(hxs[i], 16);
		}
		alert(parseInt(80, 16));
		return hxs;
	},

	Rgb2Hex: (a, b, c) => {
		let r = /^\d{1,3}$/;
		if (!r.test(a) || !r.test(b) || !r.test(c)) {
			return window.alert("错误的 rgb 颜色值");
		}
		let hexs = [a.toString(16), b.toString(16), c.toString(16)];
		for (let i = 0; i < 3; i++) {
			if (hexs[i].length == 1) hexs[i] = "0" + hexs[i];
		}
		return "#" + hexs.join("");
	},
};

const turnColor = {
	/**
	 * 得到 hex 颜色值为 color 的加深颜色值
	 * @param {Array} color - RGB 数组
	 * @param {Number} level - level 为减淡的程度，限 0-1 之间
	 */
	getDarkColor: (color, level) => {
		for (let i = 0; i < 3; i++) {
			color[i] = Math.floor(color[i] * (1 - level));
		}
		return this.RgbToHex(color[0], color[1], color[2]);
	},

	/**
	 * 得到颜色值为 color 的减淡颜色值
	 * @param {Array} color - RGB 数组
	 * @param {Number} level - level 为减淡的程度，限 0-1 之间
	 */
	getLightColor: function(color, level) {
		for (let i = 0; i < 3; i++) {
			color[i] = Math.floor((255 - color[i]) * level + color[i]);
		}
		return this.RgbToHex(color[0], color[1], color[2]);
	},
};

export { chgMode, turnColor };
