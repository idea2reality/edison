var socketManager_1 = require('../socket.io/socketManager');
var TemparatureCollector = (function () {
    function TemparatureCollector() {
        var Cylon = require('cylon');
        Cylon
            .robot({ name: 'Temperature' })
            .connection('edison', { adaptor: 'intel-iot' })
            .device('sensor', { driver: 'analogSensor', pin: 0, connection: 'edison' })
            .on('ready', function (my) {
            var sensorVal = 0;
            var ready = false;
            my.sensor.on('analogRead', function (data) {
                ready = true;
                sensorVal = data;
            });
            setInterval(function () {
                if (ready) {
                    var log = {
                        date: new Date().toISOString(),
                        type: 'temparature',
                        value: sensorVal
                    };
                    socketManager_1.default.sendData(log)
                        .then(function () { return console.log(log); })
                        .catch(function (err) { return console.log(err); });
                }
            }, 2000);
        })
            .start();
    }
    return TemparatureCollector;
})();
exports.default = new TemparatureCollector();
