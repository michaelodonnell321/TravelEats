const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params.id in admin get is', req.params.id)
    let activeGroupID = req.params.id;
    let queryText = `
    SELECT "group_name", "group_id_number", "user".id, "user".username from "user"
    JOIN "groups" ON "groups".id = $1;
    `;
    pool.query(queryText, [activeGroupID])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error in admin router get', error)
        res.sendStatus(500);
    })
})


module.exports = router;