const path = require("path");

const resPath = {
	SRC: (files = "") => path.resolve(process.cwd(), "src", files),
	BUILD: (files = "") => path.resolve(process.cwd(), "build", files),
	PUBLIC: (files = "") => path.resolve(process.cwd(), "public", files),
};

exports.resPath = resPath;
exports.default = {
	resolve: {
		extensions: ["*", ".ts", ".tsx", ".js", ".jsx"],
		modules: [resPath.PUBLIC(), "node_modules"],
		alias: {
			"@": resPath.SRC(),
			"&": resPath.PUBLIC(),
		},
	},
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
									style: "css",
								},
							],
						],
					},
				},
			},
		],
	},
};
