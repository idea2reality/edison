import socketManager from '../socket.io/socketManager';

class TemparatureCollector {
    constructor() {
        var Cylon = require('cylon');

        Cylon
            .robot({ name: 'Temperature' })
            .connection('edison', { adaptor: 'intel-iot' })
            .device('sensor', { driver: 'analogSensor', pin: 0, connection: 'edison' })
            .on('ready', function(my) {
                var sensorVal = 0;
                var ready = false;

                my.sensor.on('analogRead', function(data) {
                    ready = true;
                    sensorVal = data;
                });

                setInterval(function() {
                    if (ready) {
                        var log = { date: new Date(), type: 'temparature', value: sensorVal };
                        socketManager.sendData(log);
                        console.log(log);
                    }
                }, 2000);
            })
            .start();
    }
}

export default new TemparatureCollector();
