abstract class Led {
    private id;
    protected status;
    protected protocFormat;

    constructor(id, protocFormat) {
        this.id = id;
        this.protocFormat = protocFormat;
    }

    getStatus() { return this.status; }

    abstract getProtoc(status);
    abstract setLed(status): Promise<any>;
    abstract setLedOff(): Promise<any>;
}

export default Led;
