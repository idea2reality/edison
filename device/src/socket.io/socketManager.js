var io = require('socket.io-client');
var config_1 = require('../config');
var SocketManager = (function () {
    function SocketManager() {
        this.socket = io.connect(config_1.default.host, { 'force new connection': true });
        this.setSocket();
    }
    SocketManager.prototype.sendData = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.socket.connected)
                return reject(new Error('Socket disconnected'));
            _this.socket.emit('log', data);
            resolve();
        });
    };
    SocketManager.prototype.setSocket = function () {
        var _this = this;
        this.socket.on('connect', function () {
            console.log('+++ Socket.io connected');
            _this.socket.emit('auth', config_1.default.id, function (data) {
                if (!data.success) {
                    console.log('--- FATAL: Authentication fail because of "%s"', data.msg);
                    process.exit(1);
                }
            });
        });
        this.socket.on('error', function (err) {
            console.log('--- Socket.io error', err, _this.socket.connected);
            process.exit(1);
        });
        this.socket.on('disconnect', function () {
            console.log('--- Socket.io disconnected');
            process.exit(1);
        });
    };
    return SocketManager;
})();
var socketManager = new SocketManager();
exports.default = socketManager;
