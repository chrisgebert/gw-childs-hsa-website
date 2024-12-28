export default {
	stackbitVersion: "~0.6.0",
	ssgName: "eleventy",
	nodeVersion: "18",

	devCommand: "npx @11ty/eleventy --serve --port {PORT",

	experimental: {
		ssg: {
			proxyWebsockets: true,
			logPatterns: {
				up: ["Server at"],
			}
		}
	},

	customContentReload: true
};