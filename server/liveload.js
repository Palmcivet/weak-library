/**
 * @file Rollup live load plugin
 * @repo https://github.com/thgh/rollup-plugin-livereload
 */

import { createServer } from "livereload";
import { resolve } from "path";
import { find } from "port-authority";

const state = (global.PLUGIN_LIVERELOAD = global.PLUGIN_LIVERELOAD || {
	server: null,
});

export default function livereload(options = { watch: "" }) {
	if (typeof options === "string") {
		options = {
			watch: options,
		};
	} else {
		options.watch = options.watch || "";
	}

	// release previous server instance if rollup is reloading configuration
	// in watch mode
	if (state.server) {
		state.server.close();
	}

	let enabled = options.verbose === false;
	const portPromise = find(options.port || 35729);

	portPromise.then((port) => {
		state.server = createServer({ ...options, port });

		// Start watching
		if (Array.isArray(options.watch)) {
			state.server.watch(options.watch.map((w) => resolve(process.cwd(), w)));
		} else {
			state.server.watch(resolve(process.cwd(), options.watch));
		}
	});

	return {
		name: "livereload",
		async generateBundle() {
			if (!enabled) {
				enabled = true;
				const port = await portPromise;
				const customPort = port !== 35729 ? " on port " + port : "";
				console.log(green("LiveReload enabled" + customPort));
			}
		},
	};
}

function green(text) {
	return "\u001b[1m\u001b[32m" + text + "\u001b[39m\u001b[22m";
}
