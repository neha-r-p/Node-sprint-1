const express = require("express");

const projectsDb = require("../data/helpers/projectModel");

const router = express.Router();

// get array of all projects
router.get("/", (req, res) => {
  projectsDb
    .get()
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Projects could not be retrieved." });
    });
});

//get project with id

//insert project (post) (name and description)

//update project (name and description)

//remove project

//toggle completed (not required, boolean)


//Custom Middleware




module.exports = router;
