import * as express from "express";
import {findEdisons} from "../db";
import edisonManager from '../edison/edisonManager';

var router = express.Router();

/* GET users listing. */
router
    .get('/', (req, res, next) =>
        res.json(edisonManager.getEdisons()))
    .get('/:edisonId/latest-logs', (req, res, next) =>
        res.json(edisonManager.getLatestLogs(req.params.edisonId)))
    .post('/:edisonId/set-led', (req, res, next) => {
        var edisonId = req.params.edisonId;
        var ledId = req.body.ledId;
        var status = req.body.status;

        edisonManager.getEdison(edisonId)
            .setLed(ledId, status)
            .then((result) => res.json(result))
            .catch((err: Error) => res.json({ success: 0, error: 1, msg: err.message }));
    })

export = router;
