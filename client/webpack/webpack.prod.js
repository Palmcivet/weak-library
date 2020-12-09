const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const base = require("./webpack.base.js");

module.exports = merge(base.default, {
	mode: "production",
	devtool: "source-map",
	entry: base.resPath.SRC("App.tsx"),
	output: {
		path: base.resPath.BUILD(),
		filename: "js/[hash:5].js",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: base.resPath.PUBLIC("index.html"),
			filename: "index.html",
			title: "图书管理系统",
		}),
		new HtmlWebpackPlugin({
			template: base.resPath.PUBLIC("index.html"),
			filename: "404.html",
			title: "出错啦",
		}),
		new MiniCssExtractPlugin({
			filename: "[hash:5].css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|bmp|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "img/[hash:5].[ext]",
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
						options: { modules: { localIdentName: "[hash:5]" } },
					},
					{
						loader: "less-loader",
					},
				],
			},
		],
	},
});
