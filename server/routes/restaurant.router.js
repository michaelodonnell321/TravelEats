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

router.get('/:id', (req, res) => {
    console.log('req.params is', req.params);
    let detailsID = req.params.id;
    const queryText = `
    SELECT "comments".user_id, "comments".restaurant_id, "comments".comment, "comments".date, "comments".recommended,
    "restaurants".id, "restaurants".name, "restaurants".type, "restaurants".address, "restaurants".city,
    "restaurants".state, "restaurants".zip, "restaurants".country, "restaurants".photo_url, "restaurants".closed from "restaurants"
    JOIN "comments" ON "restaurants".id = "comments".restaurant_id
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