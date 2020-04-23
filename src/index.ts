import express = require('express');
import {variable} from './controllers/controller'

const app: express.Application = express();

app.get('/', function (req, res) {
  res.send(`Hello world and number ${variable}`);
});

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});