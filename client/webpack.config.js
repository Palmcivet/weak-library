const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const ConfigPath = {
	SRC: (files = "") => path.resolve(process.cwd(), "src", files),
	BUILD: (files = "") => path.resolve(process.cwd(), "build", files),
	PUBLIC: (files = "") => path.resolve(process.cwd(), "public", files),
};

const ConfigPlugins = [
	new HtmlWebpackPlugin({
		template: ConfigPath.PUBLIC("index.html"),
		filename: "index.html",
		title: "图书管理系统",
	}),
];

if (isDev) {
	ConfigPlugins.push(new (require("webpack").HotModuleReplacementPlugin)());
} else {
	ConfigPlugins.push(
		new HtmlWebpackPlugin({
			template: ConfigPath.PUBLIC("index.html"),
			filename: "404.html",
			title: "出错啦",
		}),
		new (require("mini-css-extract-plugin"))({
			filename: "css/[hash:5].css",
		})
	);
}

const ConfigWebpack = isDev
	? {
			devServer: {
				port: 8083,
				open: "Firefox",
				openPage: "auth",
				contentBase: ConfigPath.PUBLIC(),
				historyApiFallback: true,
				hotOnly: true,
				hot: true,
			},
	  }
	: {};

exports.default = {
	...ConfigWebpack,
	mode: isDev ? "development" : "production",
	devtool: "source-map",
	entry: ConfigPath.SRC("App.tsx"),
	output: {
		path: ConfigPath.BUILD(),
		filename: "js/[hash:5].js",
	},
	resolve: {
		extensions: ["*", ".ts", ".tsx", ".js", ".jsx"],
		modules: [ConfigPath.PUBLIC(), "node_modules"],
		alias: {
			"@": ConfigPath.SRC(),
			"&": ConfigPath.PUBLIC(),
		},
	},
	plugins: ConfigPlugins,
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						babelrc: false,
						presets: [
							[
								"@babel/preset-env",
								{
									modules: false,
									useBuiltIns: "usage",
									corejs: 3,
									targets: {
										browsers: "last 2 versions",
									},
								},
							],
							"@babel/preset-typescript",
							"@babel/preset-react",
						],
						plugins: [
							"react-hot-loader/babel",
							[
								"@babel/plugin-proposal-decorators",
								{
									legacy: true,
								},
							],
							[
								"@babel/plugin-proposal-class-properties",
								{
									loose: true,
								},
							],
							[
								"import",
								{
									libraryName: "antd",
									libraryDirectory: "es",
									style: "true",
								},
							],
						],
					},
				},
			},
			{
				test: /\.(png|jpe?g|gif|bmp|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: isDev ? "img/[name].[ext]" : "img/[hash:5].[ext]",
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					isDev
						? {
								loader: "style-loader",
						  }
						: {
								loader: require("mini-css-extract-plugin").loader,
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
};
