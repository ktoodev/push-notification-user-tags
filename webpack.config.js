const path = require('path');
const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
	entry: {
		//'index': path.resolve( __dirname, 'blocks/src', 'index.js' ),
        'push_signup/script': path.resolve( __dirname, 'blocks/src/push_signup', 'script.js' ),
        'push_signup/index': path.resolve( __dirname, 'blocks/src/push_signup', 'index.js' ),
        'push_categories/index': path.resolve( __dirname, 'blocks/src/push_categories', 'index.js' ),
	},
	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, 'blocks/build' ),
	},
};