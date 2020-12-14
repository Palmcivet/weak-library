import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

const extension = [".js", ".ts", ".jsx", ".tsx"];

export default [
	{
		input: "src/app.ts",
		output: {
			name: "index",
			file: "build/app.js",
			format: "umd",
			sourcemap: true,
		},

		plugins: [
			resolve({
				extensions: extension,
				modulesOnly: true,
			}),
			json(),
			commonjs(),
			typescript({
				tsconfig: "./tsconfig.json",
			}),
			babel({
				extensions: extension,
				babelHelpers: "bundled",
				exclude: ["node_modules"],
			}),
		],
	},
];
