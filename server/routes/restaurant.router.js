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
    WHERE "restaurants".id = $1
    ORDER BY "comment_id";
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

router.put('/closed/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
    UPDATE "restaurants"
    SET "closed" = true
    WHERE "id" = $1;
    `;
    pool.query(queryText, [req.params.id])
    .then((response) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error in closed put route', error)
        res.sendStatus(500);
    })
})

router.put('/open/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
    UPDATE "restaurants"
    SET "closed" = false
    WHERE "id" = $1;
    `;
    pool.query(queryText, [req.params.id])
    .then((response) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error in open put route', error)
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
    if (req.body.recommended === "recommended") {
        recommendedBoolean = true
    } else if (req.body.recommended === "notRecommended") {
        recommendedBoolean = false
    }
    let photoQuery = `images/${req.body.type}.jpg`;
    console.log('the photo is', photoQuery);
    let queryText = `
    WITH rows AS (
    INSERT into "restaurants" ("name", "type", "user_id", "address", "city", "state", "zip", "country", "photo_url")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id as new_restaurant_id)
    INSERT into "comments" ("user_id", "restaurant_id", "comment", "recommended")
    VALUES ($10, (SELECT new_restaurant_id FROM rows), $11, $12);
    `;
    pool.query(queryText, [req.body.name, req.body.type, req.user.id, req.body.address, req.body.city, req.body.state, req.body.zip,
    req.body.country, photoQuery, req.user.id, req.body.comments, recommendedBoolean ])
    .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error in POST restaurant', error);
        res.sendStatus(500);
    })
});

module.exports = router;