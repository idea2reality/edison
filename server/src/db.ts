import {MongoClient, Db} from "mongodb";
import {DB_NAME} from './config';

var database: Db;

function start(): Promise<Db> {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost:27017/' + DB_NAME, (err, db) => {
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
export * from './db/edison';
export * from './db/user';