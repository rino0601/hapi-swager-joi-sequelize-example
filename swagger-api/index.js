'use strict';

const fs        = require('fs'),
    path      = require('path'),
    basename  = path.basename(module.filename);
const db = require('../models');

module.exports= function(server){
	///////////////////////////////////////////////////////////////////////////////
	// add api by using sequlize
	// Object.keys(db).forEach(function (modelName) {
	// 	const Model = db[modelName];
	// });

	// add custom apis
	fs.readdirSync(__dirname).filter(file => (
	    (file.indexOf('.') !== 0) &&
	    (file !== basename) &&
	    (file.slice(-3) === '.js')
	)).forEach(function (file) {
		var apis = require(path.join(__dirname, file));
		server.route(apis);
    });
}