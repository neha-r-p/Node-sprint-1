const express = require('express')

const actionsDb = require('../data/helpers/actionModel');

const router = express.Router();

//get array of all actions
router.get("/", (req, res) => {
    actionsDb.get()
    .then(a => {
        res.status(200).json(a)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Actions could not be retrieved" })
    })
})


//insert action (post) (project_id, description (128 character max), and notes)

//update action (description and notes)

//remove action

//toggle completed (not required, boolean)










module.exports = router;