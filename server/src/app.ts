import {resolve} from "path";
import config from "./config";
import * as express from "express";

var logger = require('morgan'),
    bodyParser = require('body-parser');

import users from './routes/users';

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(resolve(__dirname, '../../web/public/')));

app.use('/users', users);

app.listen(80, () => {
    console.log('server started');
});

console.log(config);
