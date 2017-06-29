'use strict';
const db = require('../models');
const Joi = require('joi');
const JS = db.JS;

module.exports=[{
	method: 'POST',
    path: '/custom',
    config: {
        handler: (request, reply) => {
            // just echo, no record is created.
        	reply(request.payload).code(201);
        },
        tags: ['api'],
        validate: {
            payload: JS.User.withRequiredOmit('id', 'created_at', 'updated_at', 'deleted_at')
        }
    }
},{
	method: 'GET',
    path: '/custom',
    config: {
        handler: (request, reply) => {
        	reply(new Error("custom api example always returns error"));
        },
        tags: ['api'],
    }
},{
	method: 'GET',
    path: '/custom/{id}',
    config: {
        handler: (request, reply) => { 
        	reply(request.params.id).code(200);
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
    path: '/custom/{id}',
    config: {
        handler: (request, reply) => {
        	reply({
                foo:"Foo",
                bar:"Bar"
            }).code(200);
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
    path: '/custom/{id}',
    config: {
        handler: (request, reply) => {
        	reply().code(204);
        },
        tags: ['api'],
        validate: {
            params: {
                id: JS.User.joi().id
            },
        },
    }
}];
