const express = require("express");

const server = express();

server.use(express.json());

const projectsRouter = require("./projects/projectsRouter.js");
const actionsRouter = require("./actions/actionsRouter.js");

server.get("/", (req, res) => {
  res.send(`<h2>Node Sprint Challenge Week 1!</h2>`);
});

server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

server.use(logger);

module.exports = server;
