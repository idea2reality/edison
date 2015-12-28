import {MongoClient, Db} from "mongodb";
import {DB_NAME} from '../config';

var database: Db;
var p: Promise<Db>;

export function start(): Promise<Db> {
    if (p === undefined)
        p = new Promise((resolve, reject) => {
            MongoClient.connect('mongodb://localhost:27017/' + DB_NAME, (err, db) => {
                if (err)
                    return reject(err);

                database = db;
                resolve(database);
            });
        });

    return p;
}

export function getDb(): Promise<Db> {
    return start();
}
