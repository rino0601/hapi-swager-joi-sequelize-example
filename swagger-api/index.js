'use strict';

const fs        = require('fs'),
    path      = require('path'),
    basename  = path.basename(module.filename);
const db = require('../models');

function createCRUDAPIs(modelName) {
	const basepath = "/"+modelName.toLowerCase();
	const model = db[modelName];
	const joiSchema = db.JS[modelName];
	return [{
		method: 'POST',
	    path: basepath,
	    config: {
	        handler: (request, reply) => {
	        	model.create(request.payload).then(user => {
	        		reply(user).code(201);
	        	});
	        },
	        tags: ['api'],
	        validate: {
	            payload: joiSchema.withRequiredOmit('id', 'created_at', 'updated_at', 'deleted_at')
	        }
	    }
	},{
		method: 'GET',
	    path: basepath,
	    config: {
	        handler: (request, reply) => {
	        	model.findAll().then(users=>{
	        		reply(users).code(200); 
	        	});
	        },
	        tags: ['api'],
	    }
	},{
		method: 'GET',
	    path: basepath+'/{id}',
	    config: {
	        handler: (request, reply) => { 
	        	model.findById(request.params.id).then(userOrNull=>{
	        		if(userOrNull === null) throw Error("Not Found");
	        		return userOrNull;
	        	}).then(user => {
	        		reply(user).code(200);
	        	}).catch(err=>{
	        		reply().code(404); 
	        	});
	        },
	        validate: {
	            params: {
	                id: joiSchema.joi().id
	            },
	        },
	        tags: ['api'],
	    }
	},{
		method: 'PUT',
	    path: basepath+'/{id}',
	    config: {
	        handler: (request, reply) => {
	        	model.findById(request.params.id).then(userOrNull=>{
	        		if(userOrNull === null) throw Error("Not Found");
	        		let user = userOrNull;
	        		Object.keys(request.payload).forEach(function (prop) {
	        			user[prop]=request.payload[prop];
	        		});
	        		return user.save();
	        	}).then(user => {
	        		reply(user).code(200);
	        	}).catch(err => {
	        		reply().code(404);
	        	});
	        },
	        tags: ['api'],
	        validate: {
	        	params: {
	                id: joiSchema.joi().id
	            },
	            payload: joiSchema.withRequiredOmit('id', 'created_at', 'updated_at', 'deleted_at')
	        }
	    }
	},{
		method: 'DELETE',
	    path: basepath+'/{id}',
	    config: {
	        handler: (request, reply) => {
	        	model.findById(request.params.id).then(userOrNull=>{
	        		if(userOrNull === null) throw Error("Not Found");
	        		return userOrNull.destroy();
	        	}).then(() => {
	        		reply().code(204);
	        	}).catch(err=>{
	        		reply().code(404); 
	        	});
	        },
	        tags: ['api'],
	        validate: {
	            params: {
	                id: joiSchema.joi().id
	            },
	        },
	    }
	}];
};

module.exports= function(server){
	///////////////////////////////////////////////////////////////////////////////
	// add api by using sequlize
	Object.keys(db.JS).forEach(function (modelName) {
		server.route(createCRUDAPIs(modelName));
	});

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