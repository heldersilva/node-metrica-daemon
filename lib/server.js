/*jslint node: true*/

"use strict";

var restify = require('restify');
var path = require('path');

// Set run environment.
var env = process.env.NODE_ENV || 'development';

// Get config.
var config = require(path.join(__dirname, '../config/config'))[env];

// Create the server.
var server = restify.createServer({
  name: 'node-metrica-deamon',
  version: '0.0.1'
});


server.use(restify.acceptParser(server.acceptable));

require(__dirname + '/routes/procfs')(server);
require(__dirname + '/routes/os')(server);

server.listen(config.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
