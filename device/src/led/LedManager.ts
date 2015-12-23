import {led as config} from '../config';
import RgbLed from './type/RgbLed';
import BasicLed from './type/BasicLed';
import CC3200 from './type/CC3200';
import Led from './Led';

class LedManager {
    private ledMap: Map<string, Led>;

    constructor() {
        this.ledMap = new Map();
        // Fill in ledMap
        for (let led of config.leds) {
            if (led.type == 'rgb')
                this.ledMap.set(led.id, new RgbLed(led.id, config.RGB_LED_PROTOCOL_FORMAT));
            if (led.type == 'basic')
                this.ledMap.set(led.id, new BasicLed(led.id, config.BASIC_LED_PROTOCOL_FORMAT));
            if (led.type == 'CC3200')
                this.ledMap.set(led.id, new CC3200(led.id, []))
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
