export var id = '559b9ca7b7c2339046b9920e';
export var host = 'http://localhost:8080/edisons';
export var led = {
    basicLedProtocFormat: [2, 1, 1, 0x10, 0, 0, 0, 84, 3],
    rgbLedProtocFormat: [35, 49, 0, 0, 0, 38],
    serialportOption: {
        baudrate: 9600
    },
    leds: [
        { id: 'rgb', type: 'rgb' },
        { id: 'basic1', type: 'basic' },
        { id: 'basic2', type: 'basic' }
    ]
};
