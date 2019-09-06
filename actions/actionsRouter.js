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
router.delete("/:id", validateActionId, (req, res) => {
    const { id } = req.params;
  
    actionsDb
      .remove(id)
      .then(action => {
        if (action) {
          res.status(204).json({ message: "Successfully deleted the action" });
        } else {
          res
            .status(404)
            .json({ error: "The action with the specified ID does not exist" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error removing action" });
      });
  });

//toggle completed (not required, boolean)



// middleware

function validateActionId(req, res, next) {
    const { id } = req.params;
  
    actionsDb.get(id).then(id => {
      if (id) {
        req.action = req.body;
        next();
      } else {
        res.status(400).json({ message: "action with id doesn't exist" });
      }
    });
  }

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