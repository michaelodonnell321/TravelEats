const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

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

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params is', req.params);
    let detailsID = req.params.id;
    const queryText = `
    SELECT "user".username, "comments".id as "comment_id", "comments".user_id, "comments".restaurant_id, "comments".comment, "comments".date, "comments".recommended,
    "restaurants".id, "restaurants".name, "restaurants".type, "restaurants".address, "restaurants".city,
    "restaurants".state, "restaurants".zip, "restaurants".country, "restaurants".photo_url, "restaurants".closed from "restaurants"
    JOIN "comments" ON "restaurants".id = "comments".restaurant_id
    JOIN "user" ON "comments".user_id = "user".id
    WHERE "restaurants".id = $1;
    `;
    pool.query(queryText, [detailsID])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error with details get', error);
            res.sendStatus(500);
        })
})

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('restaurant POST route');
    console.log(req.body);
    //checks user authentication and logs user
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);

    let queryText = `
    INSERT into "restaurants" ("name", "type", "user_id", "address", "city", "state", "zip", "country", "photo_url")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;
    pool.query(queryText, [req.body.name, req.body.type, req.user.id, req.body.address, req.body.city, req.body.state, req.body.zip,
    req.body.country, req.body.photo_url])
    .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error in POST restaurant', error);
        res.sendStatus(500);
    })
});

module.exports = router;