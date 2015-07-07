var index_1 = require('../src/socket.io/index');
setInterval(function () {
    index_1.sendData({ date: new Date(), type: 'temparature', value: Math.random() * 30 })
        .then(function () { return console.log('+++ One log sent'); })
        .catch(function (err) { return console.log(err); });
}, 1000);
