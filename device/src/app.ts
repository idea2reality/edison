// NodeJS 0.10 version does not support Promise
if (typeof global.Promise === 'undefined')
    global.Promise = require('promise');

import './socket.io/socketManager';
import './collector/tempCollector';
