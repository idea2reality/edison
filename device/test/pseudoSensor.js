var socketManager_1 = require('../src/socket.io/socketManager');
setInterval(function () {
    socketManager_1.default.sendData({ date: new Date(), type: 'temparature', value: Math.random() * 30 })
        .then(function () { return console.log('+++ One log sent'); })
        .catch(function (err) { return console.log(err); });
}, 1000);
