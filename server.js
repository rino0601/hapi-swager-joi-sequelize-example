'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('./registers/hapi-swagger');
const models = require('./models'),
    sequelize = models.sequelize,
    Sequelize = models.Sequelize;
const SwaggerApi = require('./swagger-api');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully.');
    return sequelize.sync();
}).then(function () {
	server.register([
	    Inert,
	    Vision,
	    HapiSwagger,
	], (err) => {
        SwaggerApi(server);
	    server.start( (err) => {
	   		if (err) {
		        console.log(err);
		    } else {
		        console.log('Server running at:', server.info.uri);
		    }
	    });
	});
});