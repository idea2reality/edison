// NodeJS 0.10 version does not support Promise
global.Promise = Promise || require('promise')

import './socket.io/socketManager';
import './collector/tempCollector';
