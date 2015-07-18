import {MongoClient, Db} from "mongodb";
import config from '../config';

var database: Db;

function start(): Promise<Db> {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost:27017/' + config.dbName, (err, db) => {
            if (err)
                return reject(err);

            database = db;
            resolve(database);
        });
    });
}

function getDb(): Db {
    return database;
}

export {start, getDb};
