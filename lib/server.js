var restify = require('restify');
var procfs = require('procfs-stats');

var server = restify.createServer({
  name: 'node-metrica-deamon',
  version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));

// Main stats
['cpu', 'tcp', 'udp', 'unix', 'net', 'disk', 'wifi'].map(function (controller){
  server.get('/' + controller, function(request, response, next){
    procfs[controller](function (err, stats){
      // if (err){
      //   err;
      // }

      response.send(stats);
      return next();
    });
  });
});

// Process stats
['io', 'stat', 'statm', 'status', 'env', 'cwd', 'argv', 'fds', 'threads'].map(function (controller){
  server.get(RegExp('^\/([0-9]+)\/' + controller + '$'), function(request, response, next){
    var ps = procfs(request.params[0]);

    ps[controller](function (err, stats){
      // if (err){
      //   err;
      // }

      response.send(stats);
      return next();
    });
  });
});

server.get(RegExp('^\/([0-9]+)\/thread\/([0-9]+)$'), function(request, response, next){
  var ps = procfs(request.params[0]);

  response.send(ps.thread(request.params[1]));
  return next();
});

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});
