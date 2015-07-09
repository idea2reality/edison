import * as express from "express";
import {findEdisons} from "../db/api";
import edisonManager from '../edison/edisonManager';

var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) =>
    res.json(edisonManager.getEdisons()));

export = router;
