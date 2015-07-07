function listener(nsp: SocketIO.Namespace) {
    nsp.on('connect', (socket) => {
        console.log('+++ New USER socket connection');
    });
}

export default listener;
