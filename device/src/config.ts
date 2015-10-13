export var id = '559f4db7c6f07b3b26c72f11';
export var host = 'http://edison.idea2r.io/edisons';
export var led = {
    basicLedProtocFormat: [2, 1, 1, 0x10, 0, 0, 0, 84, 3],
    rgbLedProtocFormat: [35, 49, 0, 0, 0, 38],
    serialportOption: {
        baudrate: 9600
    },
    leds: [
        { id: 'rgb', type: 'rgb' },
        { id: 'basic1', type: 'basic' },
        { id: 'basic2', type: 'basic' },
        { id: 'basic3', type: 'basic' }
    ]
};
