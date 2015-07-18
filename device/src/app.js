// NodeJS 0.10 version does not support Promise
global.Promise = require('promise');
require('./socket.io/socketManager');
require('./collector/tempCollector');
