const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('comment post req.body', req.body)
    console.log('user in post is', req.user.id)
    console.log('restaurant id is', req.body.restaurant)
    let user = req.user.id
    let restaurantID = req.body.restaurant
    let comment = req.body.currentComment
    let queryText = `
    INSERT into "comments" ("user_id", "restaurant_id", "comment")
    VALUES ($1, $2, $3);
    `;
    pool.query(queryText, [user, restaurantID, comment])
    .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error in post comment', error);
        res.sendStatus(500);
    })
})

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let commentID = req.params.id;
    console.log('comment id to delete is', commentID);
    let queryText = `
    DELETE from "comments"
    WHERE "id" = $1;
    `;
    pool.query(queryText, [commentID])
    .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        res.sendStatus(500);
    })
})

module.exports = router;