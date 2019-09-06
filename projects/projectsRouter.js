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
router.get("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;

  projectsDb
    .get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Project could not be retrieved" });
    });
});

//insert project (post) (name and description)

//update project (name and description)

//remove project

//toggle completed (not required, boolean)

//Custom Middleware

function validateProjectId(req, res, next) {
  const { id } = req.params;

  projectsDb.get(id).then(id => {
    if (id) {
      req.project = req.body;
    } else {
      res.status(400).json({ message: "invalid project id" });
    }
  });

  next();
}

module.exports = router;
