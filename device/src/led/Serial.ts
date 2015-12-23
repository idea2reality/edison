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

    write(protoc: string): Promise<any>
    write(protoc: number[]): Promise<any>
    write(protoc: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isOpen)
                return reject(new Error('Serial port is NOT available!'));
            var buf;
            // Type guards
            if (typeof protoc === 'string')
                buf = new Buffer(protoc, 'ascii');
            else
                buf = new Buffer(protoc);
            // Write
            this.serialPort.write(buf, (err) => {
                if (err) return reject(err);
                // Waits until all output data has been transmitted to the serial port
                this.serialPort.drain((err) => {
                    if (err) return reject(err);
                    winston.info('[led] Serial: Written -> ' + protoc);
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
        this.serialPort.on('data', (data) => winston.info('[led] Serial: Received -> ' + data));
    }


    private static instance: Serial;

    static getInstance(): Serial {
        if (Serial.instance === undefined)
            Serial.instance = new Serial();

        return Serial.instance;
    }
}

export default Serial.getInstance();
