/*jslint node: true*/

"use strict";

var procfs = require('procfs-stats');

var mainRoutes = ['cpu', 'tcp', 'udp', 'unix', 'net', 'disk', 'wifi'];
var processRoutes = ['io', 'stat', 'statm', 'status', 'env', 'cwd', 'argv', 'fds', 'threads'];

module.exports = function (server){
  // Main stats
  mainRoutes.map(function (route){
    server.get('/procfs-stats/' + route, function(request, response, next){
      procfs[route](function (err, stats){
        next.ifError(err);

        response.send(stats);
        return next();
      });
    });
  });

  // Process stats
  processRoutes.map(function (route){
    server.get(RegExp('^\/procfs-stats/([0-9]+)\/' + route + '$'), function(request, response, next){
      var ps = procfs(request.params[0]);

      ps[route](function (err, stats){
        next.ifError(err);

        response.send(stats);
        return next();
      });
    });
  });
}
