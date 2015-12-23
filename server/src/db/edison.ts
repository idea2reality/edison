var assign = require('object.assign');
import {ObjectID} from 'mongodb';
import {getDb} from './mongo';
import Edison from '../edison/Edison';
import {LOG_CACHE_SIZE} from '../config';

var coll;
var logColl;

getDb().then((db) => {
    coll = db.collection('edison');
    logColl = db.collection('edisonLog');
});


function findEdisons(): Promise<Edison[]> {
    return new Promise((resolve, reject) =>
        coll.find().toArray((err, edisonData) => {
            if (err) return reject(err);
            var edisons = [];
            edisonData.forEach(data => edisons.push(new Edison(data)));
            resolve(edisons);
        }));
}

function log(edison: Edison, log: any): Promise<any> {
    log.date = new Date(log.date);
    log.edison = edison.getObjectId();

    return new Promise((resolve, reject) =>
        logColl.insert(log, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        }));
}

function findLatestLogs(edisonId: ObjectID): Promise<any[]> {
    return new Promise((resolve, reject) =>
        logColl
            .find({ edison: edisonId })
            .sort({ date: -1 })
            .limit(LOG_CACHE_SIZE)
            .toArray((err, results) => {
                if (err) return reject(err);
                resolve(results);
            }));
}

/**
* @deprecated
*/
function has(edison: Edison): Promise<boolean> {
    return new Promise((resolve, reject) =>
        coll.findOne({ _id: edison.getObjectId() }, (err, edison) => {
            if (err)
                return reject(err);

            if (edison)
                return resolve(true);
            resolve(false);
        }));
}

export {findEdisons, has, log, findLatestLogs};
