const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
    let userID = req.params.id
    let queryText = `
    SELECT * FROM "user"
    WHERE "id" = $1;
    `;
    pool.query(queryText, [userID])
    .then((response) => {
        res.send(response.rows)
    })
    .catch((error) => {
        console.log('error in profile get', error)
        res.sendStatus(500);
    })
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
    let userID = req.params.id;
    console.log('profile put req.body is', req.body);
    let updatedEmail = req.body.updatedUserInfo.email;
    let updatedName = req.body.updatedUserInfo.name;
    let updatedLocation = req.body.updatedUserInfo.location;
    let queryText = `
    UPDATE "user"
    SET "email" = $1, "name" = $2, "location" = $3
    WHERE "id" = $4;
    `;
    pool.query(queryText, [updatedEmail, updatedName, updatedLocation, userID])
    .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error in profile put', error)
        res.sendStatus(500);
    })
})

module.exports = router