const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    let userID = req.user.id;
    console.log(' in group router get userID is', userID);
    let queryText = `
    SELECT "user".id as user_id, username, "user".active_group_id, "groups".group_name, "groups".id FROM "groups"
    JOIN "user" ON "user".active_group_id = "groups".id
    WHERE "user".id = ($1);
    `;
    pool.query(queryText, [userID])
        .then(result => res.send(result.rows))
        .catch(error => {
        console.log('error in group router get', error);
        res.sendStatus(500);
    })
})

router.get('/allgroups', rejectUnauthenticated, (req, res) => {
    let userID = req.user.id;
    let queryText = `
    SELECT "user".id, "groups".group_name FROM "groups"
    JOIN "users_groups" ON "users_groups".groups_id = "groups".id
    JOIN "user" ON "user".id = "users_groups".user_id
    WHERE "user".id = ($1);
    `;
    pool.query(queryText, [userID])
    .then(result => res.send(result.rows))
    .catch(error => {
        console.log('error in group allgroups get', error);
        res.sendStatus(500);
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('group router req.body is', req.body)
    let groupName = req.body.newGroup.newGroupName;
    let groupID = req.body.newGroup.newGroupID;
    let adminID = req.body.adminID;
    console.log(`group post items name ${groupName}, id ${groupID}, admin ${adminID}`)
    //inserts new group and also inserts admin into users_groups
    let queryText = `
    WITH rows AS (
	INSERT into "groups" ("group_name", "group_id_number", "group_admin")
	VALUES ($1, $2, $3)
	RETURNING id as new_group_id, group_admin as person)
	INSERT INTO "users_groups" ("user_id", "groups_id")
	VALUES ((SELECT person FROM rows), (SELECT new_group_id FROM rows));
    `;
    pool.query(queryText, [groupName, groupID, adminID])
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error in group post', error);
            res.sendStatus(500);
        })
})


module.exports = router;