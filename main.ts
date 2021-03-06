import _ = require('underscore');
import appConfig = require('./core/config');
import assert = require('assert');
import bodyParser = require('body-parser');
import express = require('express');
import db = require('./core/db');
import plugin = require('./core/plugin');
import util = require('util');

let app = express();

plugin.initialize();
db.initialize(appConfig.mongodb.url)
.map(() => {
  let exitHandler = () => {
    console.log('Closing db connection.');
    db.close(true);
  };
  let signalExit = (sig: string) => {
    return () => {
      console.log('Process terminated by ' + sig);
      process.exit(0);
    };
  };
  process.on('SIGINT', signalExit('SIGINT'));
  process.on('SIGTERM', signalExit('SIGTERM'));
  process.on('exit', exitHandler);
  process.on('uncaughtException', (ex: Error) => {
    console.error('Uncaught exception %j', ex);
    exitHandler();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.get('/', function (req, res) {
    res.send('Hello World!');
  });

  function handlePlugin(req: express.Request, res: express.Response) {
    plugin.get(req.params.name).handle(req, res);
  }

  assert(_.isArray(appConfig.methods), util.format('%j is not array', appConfig.methods));
  appConfig.methods.forEach((method: string) => {
    switch (method) {
    case 'get':
      app.get('/plugin/:name/:action(*)', handlePlugin);
      break;
    case 'post':
      app.post('/plugin/:name/:action(*)', handlePlugin);
      break;
    case 'delete':
      app.delete('/plugin/:name/:action(*)', handlePlugin);
      break;
    case 'put':
      app.put('/plugin/:name/:action(*)', handlePlugin);
      break;
    }
  });

  let server = app.listen(appConfig.port, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
})
.recover((err: Error) => {
  console.error((<any>err).stack);
  process.exit(-1);
});
