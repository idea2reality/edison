import Edison from './edison.class';

class EdisonMap {
    private map: Map<string, Edison>;
    private listeners: Function[] = [];

    constructor() {
        this.map = new Map<string, Edison>();
    }

    get(id): Edison {
        return this.map.get(id);
    }

    set(id, edison: Edison) {
        this.map.set(id, edison);
        this.updated(id, edison);
        return this;
    }

    delete(id) {
        if (!this.map.delete(id))
            return false;
        this.updated(id);
        return true;
    }

    onUpdate(listener: (id: string, edison?: Edison) => void) {
        this.listeners.push(listener);
    }

    private updated(id: string, edison?: Edison) {
        this.listeners.forEach((listener) => listener(id, edison));
    }

}

export default EdisonMap;
