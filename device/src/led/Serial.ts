import {led as config} from '../config';
import * as winston from 'winston';
var mraa = require('mraa');
var SerialPort = require('serialport').SerialPort;


var uart = new mraa.Uart(0);
var serialPath = uart.getDevicePath();


class Serial {
    private serialPort;

    constructor() {
        this.initialize();
    }

    get isOpen(): boolean {
        if (this.serialPort === undefined)
            return false;
        return this.serialPort.isOpen();
    }

    write(protoc: number[]): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isOpen)
                return reject(new Error('Serial port is NOT available!'));
            // Write
            this.serialPort.write(new Buffer(protoc), (err) => {
                if (err) return reject(err);
                // Waits until all output data has been transmitted to the serial port
                this.serialPort.drain((err) => {
                    if (err) return reject(err);
                    resolve();
                });
            })
        });
    }

    private initialize() {
        this.serialPort = new SerialPort(serialPath, config.serialportOption);
        this.serialPort.on('open', () => {
            winston.info('[led] Serial: Serial port OPEN at', serialPath);
        });
    }


    private static instance: Serial;

    static getInstance(): Serial {
        if (Serial.instance === undefined)
            Serial.instance = new Serial();

        return Serial.instance;
    }
}

export default Serial.getInstance();
