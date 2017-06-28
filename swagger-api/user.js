'use strict';
const db = require('../models');
const Joi = require('joi');
const JS = db.JS;

module.exports=[{
	method: 'POST',
    path: '/user_by_custom',
    config: {
        handler: (request, reply) => {
        	db.User.create(request.payload).then(user => {
        		reply(user).code(201);
        	});
        },
        tags: ['api'],
        validate: {
            payload: JS.User.withRequiredOmit('id', 'created_at', 'updated_at', 'deleted_at')
        }
    }
},{
	method: 'GET',
    path: '/user_by_custom',
    config: {
        handler: (request, reply) => {
        	db.User.findAll().then(users=>{
        		reply(users).code(200); 
        	});
        },
        tags: ['api'],
    }
},{
	method: 'GET',
    path: '/user_by_custom/{id}',
    config: {
        handler: (request, reply) => { 
        	db.User.findById(request.params.id).then(userOrNull=>{
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
                id: JS.User.joi().id
            },
        },
        tags: ['api'],
    }
},{
	method: 'PUT',
    path: '/user_by_custom/{id}',
    config: {
        handler: (request, reply) => {
        	db.User.findById(request.params.id).then(userOrNull=>{
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
                id: JS.User.joi().id
            },
            payload: JS.User.withRequiredOmit('id', 'created_at', 'updated_at', 'deleted_at')
        }
    }
},{
	method: 'DELETE',
    path: '/user_by_custom/{id}',
    config: {
        handler: (request, reply) => {
        	db.User.findById(request.params.id).then(userOrNull=>{
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
                id: JS.User.joi().id
            },
        },
    }
}];
