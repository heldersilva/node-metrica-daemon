/*jslint node: true*/

"use strict";

var os = require('os');
var async = require('async');

var mainRoutes = ['cpu', 'mem', 'uptime', 'loadavg'];
var processRoutes = ['uptime'];

module.exports = function (server){

  server.get('/os/cpu', function(request, response, next){
    async.parallel({
      usage: function(done){
        os.cpuUsage(function (value){
          done(null, value);
        });
      },
      free: function(done){
        os.cpuFree(function (value){
          done(null, value);
        });
      }
    },
    function (err, result){
      next.ifError(err);

      response.send(result);
      return next();
    });
  });

  server.get('/os/mem', function(request, response, next){
    async.parallel({
      total: function(done){
        done(null, os.totalmem());
      },
      free: function(done){
        done(null, os.freemem());
      },
      percentage: function(done){
        done(null, (os.freemem() / os.totalmem()));
      }
    },
    function (err, result){
      next.ifError(err);

      response.send(result);
      return next();
    });
  });

  server.get('/os/loadavg', function(request, response, next){
    var loads = os.loadavg();

    response.send({
      1: loads[0],
      5: loads[1],
      15: loads[2]
    });
    return next();
  });

  server.get('/os/uptime', function (request, response, next){
    response.send({
      seconds: os.uptime()
    });

    return next();
  });
}
