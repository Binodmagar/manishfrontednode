var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry:{
		index:'./src/index.js'
	},
	output:{
		path: path.resolve(__dirname,'dist'),
		filename: 'main.js'
	},
	module:{
		rules: [
		{
			test:/.\js$/,
			exclude:/node_modules/,
			use: 'babel-loader'
		}
		]
	},

	devServer:{
		contentBase: path.join(__dirname,"public/"),
		port:3000,
		hot:true,
		publicPath: "http://localhost:3000/dist/"
	}
}