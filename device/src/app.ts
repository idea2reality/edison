// NodeJS 0.10 version does not support Promise
if (typeof global.Promise === 'undefined')
    global.Promise = require('promise');

import socketManager from './socket.io/socketManager';
// import tempCollector from './collector/tempCollector';
import ledManager from './led/LedManager';

var sendIt = false;

// tempCollector.onRead((data) => {
//     // Send log per second
//     if (sendIt) {
//         var log = { date: new Date(), type: 'temparature', value: data };
//         socketManager.sendData(log);
//         sendIt = false;
//     }
// });

setInterval(() => {
    sendIt = true;
}, 1000);

socketManager.onSetLed((ledId, status, ack) =>
    ledManager.getLed(ledId)
        .setLed(status)
        .then(() => ack({ success: 1, error: 0 }))
        .catch((err: Error) => ack({ success: 0, error: 1, msg: err.message })));
