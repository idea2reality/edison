import express = require('express')
import path = require('path');

var logger = require('morgan'),
    bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../../web/public/')));

app.use('/', routes);
app.use('/users', users);

app.listen(80);
