/**
 * Created by rino0 on 2017-06-27.
 */
"use strict";
const HapiSwagger = require('hapi-swagger');
const options = {
	'info': {
	    'title': 'hapi-swagger & joi-sequelize sample API Documentation',
	    'version': '0.0.1',
	    'contact': {
	        'name': 'Han Jong Ko',
	        'email': 'rino0601.dev@gmail.com'
		}
	}
};
module.exports = {
    'register': HapiSwagger,
    'options': options
};