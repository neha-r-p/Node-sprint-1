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

router.post("/", validateProject, (req, res) => {
  const newProject = req.body;
  console.log("new project", newProject);

  projectsDb
    .insert(newProject)
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error creating project" });
    });
});

//update project (name and description)

//remove project

//toggle completed (not required, boolean)

//Custom Middleware

function validateProjectId(req, res, next) {
  const { id } = req.params;

  projectsDb.get(id).then(id => {
    if (id) {
      req.project = req.body;
      next();
    } else {
      res.status(400).json({ message: "invalid project id" });
    }
  });
}

function validateProject(req, res, next) {
  const { name, description } = req.body;

  if (name && description) {
    next();
  } else if (name === "" || description === "") {
    res.status(400).json({ error: "Both name and description required" });
  } else {
    res.status(400).json({ error: "Missing project data" });
  }
}

module.exports = router;
