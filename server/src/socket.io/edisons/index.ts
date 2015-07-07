function listener(nsp: SocketIO.Namespace) {
    nsp.on('connect', (socket) => {
        console.log('+++ New EDISON socket connection');
    });

    nsp.on('set', (name) => {
        console.log(name, 'wants to join');
    });
}

export default listener;
