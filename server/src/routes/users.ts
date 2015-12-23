import * as express from "express";
import {findAllUsers} from "../db";

var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) =>
    findAllUsers()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    );

export = router;
