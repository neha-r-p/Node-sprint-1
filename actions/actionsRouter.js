const express = require('express')

const actionsDb = require('../data/helpers/actionModel');

const router = express.Router();

//get array of all actions
router.get("/", (req, res) => {
    actionsDb.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Actions could not be retrieved" })
    })
})


//insert action (post) (project_id, description (128 character max), and notes)
router.post("/", validateAction, (req, res) => {
    const newAction = req.body
    actionsDb.insert(newAction)
    .then(a =>{
        res.status(200).json(a);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error creating action" })
    })
})


//update action (description and notes)

//remove action

//toggle completed (not required, boolean)



// middleware

function validateAction(req, res, next){
    const { project_id, description, notes } = req.body;
    if(project_id && description !== "" && notes !== ""){
        if(description.length > 128){
        res.status(400).json({ error: "Decription must be less than 128 characters" })}
        else { next();}
    }
    
     else {
        res.status(400).json({ error: "Missing action data" })
    }
}






module.exports = router;