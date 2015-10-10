import {led as config} from '../config';
import RgbLed from './type/RgbLed';
import BasicLed from './type/BasicLed';
import Led from './Led';

class LedManager {
    private ledMap: Map<string, Led>;

    constructor() {
        this.ledMap = new Map();
        // Fill in ledMap
        for (let led in config.leds) {
            if (led.type == 'rgb')
                this.ledMap.set(led.id, new RgbLed(led.id, config.rgbLedProtocFormat));
            if (led.type == 'basic')
                this.ledMap.set(led.id, new BasicLed(led.id, config.basicLedProtocFormat));
        }
    }

    getLed(id: string): Led { return this.ledMap.get(id); }


    private static instance: LedManager;

    static getInstance(): LedManager {
        if (LedManager.instance === undefined)
            LedManager.instance = new LedManager();

        return LedManager.instance;
    }
}

export default LedManager.getInstance();
