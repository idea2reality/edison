import {findEdisons} from '../db/edison/index';
import Edison from '../common/edison.class';

class EdisonMap {
    private map: Map<string, Edison>;

    constructor() {
        this.map = new Map<string, Edison>();
        findEdisons()
            .then((edisons) =>
                edisons.forEach((edison) =>
                    this.set(edison.getId(), edison)));
    }

    private set(id, edison: Edison) {
        return this.map.set(id, edison);
    }

    get(id): Edison {
        return this.map.get(id);
    }

    toArray(): Edison[] {
        var edisons = [];
        this.map.forEach(edison => edisons.push(edison.getData()));
        return edisons;
    }

    delete(id) {
        return this.map.delete(id);
    }

    has(id): boolean {
        return this.map.has(id);
    }
}

export default EdisonMap;
