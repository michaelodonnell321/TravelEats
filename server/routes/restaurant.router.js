const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "restaurants";
`;
    pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error in restaurant get', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('restaurant POST route');
    console.log(req.body);
    //checks user authentication and logs user
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);

    // let queryText = `
    // INSERT into "restaurants" ("name", "type", "user_id", "address", "city", "state", "zip", "country", "photo_url")
    // values
    // `
    res.sendStatus(200);
});

module.exports = router;