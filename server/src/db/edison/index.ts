import assign = require('object.assign');
import {ObjectID} from 'mongodb';
import {getDb} from '../index';
import Edison from '../../common/edison.class';

var db = getDb();
var coll = db.collection('edison');
var logColl = db.collection('edisonLog');

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
    var date;
    if (log.date)
        date = new Date(log.date);
    else
        date = new Date();

    assign(log, { _id: date, edison: edison.getObjectId() });
    delete log.date;

    return new Promise((resolve, reject) =>
        logColl.insert(log, (err, result) => {
            if (err) return reject(err);
            resolve(result);
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

export {findEdisons, has, log};
