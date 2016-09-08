import common from './common.webpack.babel';
import mergeConfig from './merge-config';
import webpack from 'webpack';

export default mergeConfig(common, {
	entry: {
		app: [
			'webpack-hot-middleware/client',
			'./client/index.jsx',
		],
	},
	output: {
		path: '/',
		publicPath: '/',
		filename: '[name].js'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
	],
});
