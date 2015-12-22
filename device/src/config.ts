export const EDISON_ID = '559f4db7c6f07b3b26c72f11';
export const HOST = 'http://edison.idea2r.io/edisons';
export const led = {
    BASIC_LED_PROTOCOL_FORMAT: [2, 1, 1, 0x10, 0, 0, 0, 84, 3],
    RGB_LED_PROTOCOL_FORMAT: [35, 49, 0, 0, 0, 38],
    serialportOption: {
        BAUDRATE: 9600
    },
    leds: [
        { id: 'rgb', type: 'rgb' },
        { id: 'basic1', type: 'basic' },
        { id: 'basic2', type: 'basic' },
        { id: 'basic3', type: 'basic' }
    ]
};
