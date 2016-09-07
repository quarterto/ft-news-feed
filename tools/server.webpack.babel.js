import {IgnorePlugin, BannerPlugin} from 'webpack';
import fs from 'fs';
import path from 'path';
import common from './common.webpack.babel';

const nodeModules = fs.readdirSync('node_modules')
.filter(x =>
	x !== '.bin'
)
.reduce((modules, mod) => {
	modules[mod] = 'commonjs ' + mod;
	return modules;
}, {});

export default {
	...common,
	entry: './server/index.js',
	target: 'node',
	output: {
		path: path.join(__dirname, '../build'),
		filename: 'backend.js'
	},
	externals: nodeModules,
	plugins: [
		new IgnorePlugin(/\.(css|less)$/),
		new BannerPlugin(
			'require("source-map-support").install();',
			{ raw: true, entryOnly: false }
		)
	],
	devtool: 'sourcemap',
	node: {
		console: true,
		global: true,
		process: true,
		Buffer: true,
		__filename: true,
		__dirname: true,
		setImmediate: true
	}
};
