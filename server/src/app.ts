import {resolve} from "path";
import {Server} from 'http';
import * as express from "express";
import * as SocketIO from "socket.io";
import {DB_NAME, PORT} from "./config";

var logger = require ('morgan'),
    bodyParser = require ('body-parser');

var app = express();
var server = require ('http').Server(app);
var io = SocketIO(server);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(resolve(__dirname, '../../web/public/')));

import {start as startMongodb} from './db';

startMongodb()
    .then((db) => {
        console.log('+++ MongoDB connected to ' + DB_NAME);
    }) 
    .then(() => {
        app.use('/users', require ('./routes/users'));
        app.use('/edisons', require ('./routes/edisons'));
    })
    .then(() => {
        require ('./edison/edisonManager');
        require ('./user/userManager');
        io.of('/users').on('connect', (socket) => console.log('+++ New USER socket connection'));
    })
    .then(() => {
        server.listen(PORT, () => {
            console.log('+++ Server started on port ' + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });


export {io};
