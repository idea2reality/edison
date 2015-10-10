import * as winston from 'winston';
import socketManager from '../socket.io/socketManager';
var cylon = require('cylon');

class TemperatureCollector {
    private my;

    constructor() {
        this.initialize();
    }

    onRead(listener: (data) => void) {
        if (this.my === undefined)
            return winston.error('TemperatureCollector is not Ready!');
        this.my.sensor.on('analogRead', (data) => listener(data));
    }

    private initialize() {
        cylon
            .robot({ name: 'Temperature' })
            .connection('edison', { adaptor: 'intel-iot' })
            .device('sensor', { driver: 'analogSensor', pin: 0, connection: 'edison' })
            .on('ready', (my) => { this.my = my; })
            .start();
    }


    private static instance: TemperatureCollector;

    static getInstance(): TemperatureCollector {
        if (TemperatureCollector.instance === undefined)
            TemperatureCollector.instance = new TemperatureCollector();

        return TemperatureCollector.instance;
    }
}

export default TemperatureCollector.getInstance();
