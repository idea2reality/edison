// NodeJS 0.10 version does not support Promise
if (typeof global.Promise === 'undefined')
    global.Promise = require('promise');
if (typeof global.Map === 'undefined')
    global.Map = require('hashmap');

import * as winston from 'winston';
winston.level = 'debug';

import socketManager from './socket.io/socketManager';
import tempSensor from './sensor/TemperatureSensor';
import ledManager from './led/LedManager';

// Temperature Sensor
/*
var sendIt = false;

setInterval(() => {
    sendIt = true;
}, 1000);

tempSensor.onRead((data) => {
    // Send log per second
    if (sendIt) {
        var log = { date: new Date(), type: 'temperature', value: data };
        socketManager.sendData(log);
        sendIt = false;
    }
});
*/

// socketManager.onSetLed((ledId, status, ack) =>
//     ledManager.getLed(ledId)
//         .setLed(status)
//         .then(() => ack({ success: 1, error: 0 }))
//         .catch((err: Error) => ack({ success: 0, error: 1, msg: err.message })));

socketManager.onSetLed((ledId, status, ack) =>
    ledManager.getLed('CC3200')
        .setLed(status)
        .then(() => ack({ success: 1, error: 0 }))
        .catch((err: Error) => ack({ success: 0, error: 1, msg: err.message })));
