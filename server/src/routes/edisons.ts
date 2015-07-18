import * as express from "express";
import {findEdisons} from "../db/api";
import edisonManager from '../edison/edisonManager';

var router = express.Router();

/* GET users listing. */
router
    .get('/', (req, res, next) =>
        res.json(edisonManager.getEdisons()))
    .get('/:edisonId/latest-logs', (req, res, next) =>
        res.json(edisonManager.getLatestLogs(req.params.edisonId)))

export = router;
