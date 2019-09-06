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

// get project actions (based on ID)
router.get("/:id/actions", validateProjectId, (req, res) => {
    const { id } = req.params;

    projectsDb.getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Actions for project not found" })
    })
})



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

//remove project
router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;

  projectsDb
    .remove(id)
    .then(project => {
      if (project) {
        res.status(204).json({ message: "Successfully deleted the project" });
      } else {
        res
          .status(404)
          .json({ error: "The project with the specified ID does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error removing project" });
    });
});

//update project (name and description)

router.put("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  projectsDb
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ error: "Project not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Project could not be updated" });
    });
});

//toggle completed (not required, boolean)

//Custom Middleware

function validateProjectId(req, res, next) {
  const { id } = req.params;

  projectsDb.get(id).then(id => {
    if (id) {
      req.project = req.body;
      next();
    } else {
      res.status(400).json({ message: "project with id doesn't exist" });
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
