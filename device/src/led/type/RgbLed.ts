import Led from '../Led';
import serial from '../Serial';
import {led as config} from '../../config';


class RgbLed extends Led {

    protected status: number[];   // RGB

    setLed(rgb: number[]): Promise<any> {
        return serial.write(this.getProtoc(rgb))
            .then(() => { this.status = rgb; })
    }

    setLedOff(): Promise<any> {
        return serial.write(this.getProtoc([0, 0, 0]))
            .then(() => { this.status = [0, 0, 0]; })
    }

    getProtoc(rgb: number[]) {
        var protoc = this.protocFormat;
        protoc[2] = rgb[0];
        protoc[3] = rgb[1];
        protoc[4] = rgb[2];

        return protoc;
    }
}

export default RgbLed;
