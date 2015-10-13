import {resolve} from "path";
import {Server} from 'http';
import * as express from "express";
import * as SocketIO from "socket.io";
import config from "./config";

var logger = require ('morgan'),
    bodyParser = require ('body-parser');

var app = express();
var server = require ('http').Server(app);
var io = SocketIO(server);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(resolve(__dirname, '../../web/public/')));

import {start as startMongodb} from './db/index';
/*import {init as initSocketIO} from './socket.io/index';*/

startMongodb()
    .then((db) => {
        console.log('+++ MongoDB connected to ' + config.dbName);
    }) 
    .then(() => {
        app.use('/users', require ('./routes/users'));
        app.use('/edisons', require ('./routes/edisons'));
    })
    .then(() => {
        require ('./edison/edisonManager');
        require ('./users/userManager');
        io.of('/users').on('connect', (socket) => console.log('+++ New USER socket connection'));
    })
    .then(() => {
        server.listen(config.port, () => {
            console.log('+++ Server started on port ' + config.port);
        });
    })
    .catch((err) => {
        console.log(err);
    });


export {io};
