import Led from '../Led';
import serial from '../Serial';
import {led as config} from '../../config';


class BasicLed extends Led {

    protected status: boolean;

    setLed(status: boolean): Promise<any> {
        return serial.write(this.getProtoc(status))
            .then(() => { this.status = status; })
    }

    setLedOff(): Promise<any> {
        return serial.write(this.getProtoc(false))
            .then(() => { this.status = false; })
    }

    getProtoc(status: boolean) {
        var protoc = this.protocFormat;

        if (status) {
            protoc[4] = 100;
            protoc[5] = 100;
            protoc[6] = 100;
        }
        else {
            protoc[4] = 0;
            protoc[5] = 0;
            protoc[6] = 0;
        }

        return protoc;
    }
}

export default BasicLed;
