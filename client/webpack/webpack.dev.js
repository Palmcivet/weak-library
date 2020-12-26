const { merge } = require("webpack-merge");
const HMRPlugin = require("webpack").HotModuleReplacementPlugin;
const base = require("./webpack.base.js");

module.exports = merge(base.default, {
	mode: "development",
	devtool: "source-map",
	entry: base.resPath.SRC("App.tsx"),
	output: {
		path: base.resPath.BUILD(),
		filename: "js/[hash:5].js",
	},
	devServer: {
		port: 8083,
		open: "Firefox",
		openPage: "auth",
		contentBase: base.resPath.PUBLIC(),
		historyApiFallback: true,
		hot: true,
		hotOnly: true,
	},
	plugins: [new HMRPlugin()],
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|bmp|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "img/[name].[ext]",
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
						options: { modules: { localIdentName: "[local]" } },
					},
					{
						loader: "less-loader",
					},
				],
			},
		],
	},
});
