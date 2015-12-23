import {getDb} from "./mongo";

var db = getDb();
var coll = db.collection('users');

function findAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
        coll.find().toArray((err, users) => {
            if (err)
                return reject(err);
            resolve(users);
        });
    })
}

export {findAllUsers};
