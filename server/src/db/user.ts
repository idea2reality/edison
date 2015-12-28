import {getDb} from "./mongo";

var coll;

getDb().then((db) => {
    coll = db.collection('users');
})


export function findAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
        coll.find().toArray((err, users) => {
            if (err)
                return reject(err);
            resolve(users);
        });
    })
}
