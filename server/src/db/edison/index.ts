import {getDb} from "../index";
import assign = require('object.assign');

var db = getDb();
var coll = db.collection('edison');
var logColl = db.collection('edisonLog');

function findAllEdisons(): Promise<any> {
    return new Promise((resolve, reject) =>
        coll.find().toArray((err, edisons) => {
            if (err) return reject(err);
            resolve(edisons);
        }));
} 

function log(edisonId: string, log: any): Promise<any> {
    var date;
    if (log.date)
        date = new Date(log.date);
    else
        date = new Date();
    assign(log, { _id: date, edison: edisonId });
    delete log.date;

    return new Promise((resolve, reject) =>
        logColl.insert(log, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        }));
}

function has(edisonId: string): Promise<boolean> {
    return new Promise((resolve, reject) =>
        coll.findOne({ name: edisonId }, (err, edison) => {
            if (err)
                return reject(err);

            if (edison)
                return resolve(true);
            resolve(false);
        }));
}

export {findAllEdisons, has, log};
