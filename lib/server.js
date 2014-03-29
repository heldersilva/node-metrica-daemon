var restify = require('restify');

var server = restify.createServer({
  name: 'node-metrica-deamon',
  version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));

require(__dirname + '/routes/procfs')(server);

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});
