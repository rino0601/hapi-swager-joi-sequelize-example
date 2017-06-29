'use strict';
const db = require('../models');
const Joi = require('joi');
const JS = db.JS;

module.exports=[{
	method: 'PUT',
    path: '/user/{id}/profile',
    config: {
        handler: (request, reply) => {
        	db.User.findById(request.params.id).then(userOrNull=>{
        		if(userOrNull === null) throw Error("Not Found");
                return userOrNull;
        	}).then(user => {
                if(!request.payload.id){ // true means payload has no id;
                    throw Error("Not Found");
                }
                return db.Profile.findById(request.payload.id).then(profileOrNull=>{
                    if(profileOrNull) return profileOrNull;
                    throw Error("Not Found");
                }).then(profile => {
                    Object.keys(request.payload).forEach(function (prop) {
                        profile[prop]=request.payload[prop];
                    });
                    return user.setProfile(profile).then(()=>{
                        reply(profile).code(200);
                    });
                });
        	}).catch(err => {
        		reply().code(404);
        	});
        },
        tags: ['api'],
        validate: {
        	params: {
                id: JS.User.joi().id
            },
            payload: JS.Profile.withRequiredOmit('id', 'created_at', 'updated_at', 'deleted_at')
        }
    }
},{
    method: 'POST',
    path: '/user/{id}/profile',
    config: {
        handler: (request, reply) => {
            db.User.findById(request.params.id).then(userOrNull=>{
                if(userOrNull) return userOrNull;
                throw Error("Not Found");
            }).then(user => {
                return db.Profile.create(request.payload).then(profile => {
                    return user.setProfile(profile).then(()=>{
                        reply(profile).code(201);
                    });
                });
            }).catch(err => {
                reply().code(404);
            });
        },
        tags: ['api'],
        validate: {
            params: {
                id: JS.User.joi().id
            },
            payload: JS.Profile.withRequiredOmit('id', 'created_at', 'updated_at', 'deleted_at')
        }
    }
}];
