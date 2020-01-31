const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ENTRY = path.join(__dirname, "source");
const OUTPUT = path.join(__dirname, "public");
const STATIC = path.join(__dirname, "static");

module.exports = {
	mode: "production",
	entry: path.join(ENTRY, "index.jsx"),
	output: {
		path: OUTPUT,
		filename: "js/index.bundle.js",
	},
	resolve: {
		extensions: [".js", ".jsx"],
		modules: [ENTRY, "node_modules"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(STATIC, "index.html"),
			filename: "index.bundle.html",
			path: OUTPUT,
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
			chunkFilename: "css/[id].css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/env", "@babel/react"],
						plugins: [
							"@babel/plugin-proposal-class-properties",
							"react-hot-loader/babel",
							[
								"import",
								{
									libraryName: "antd",
									libraryDirectory: "es",
									style: "css",
								},
							],
						],
					},
				},
			},
			{
				test: /\.css/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: true,
						},
					},
					"css-loader",
				],
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif|mp3|eot|woff|woff2|ttf)([\\?]?.*)$/,
				loader: "file-loader",
				options: {
					name: "assets/[hash].[ext]",
				},
			},
		],
	},
};
