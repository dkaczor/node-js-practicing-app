import express = require('express');
import * as controllers from './controllers/controller'

const app: express.Application = express();

app.get('/', function (req, res) {
  res.send(`Hello world  and number ${controllers.variable}`);
});

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});