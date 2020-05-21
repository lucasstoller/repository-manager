const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories).status(200)
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body
  const repo = {
    id: uuid(),
    likes: 0,
    url,
    title,
    techs
  }
  repositories.push(repo)
  
  return response.json(repo).status(201)
});

app.put("/repositories/:id", checkIfRepositoryExists, (request, response) => {
  const { repoIndex } = request
  const { id } = request.params
  const { url, title, techs } = request.body

  const updatedRepo = { id, url, title, techs }
  repositories[repoIndex] = updatedRepo

  return response.json(updatedRepo).status(200)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

// Middlewares

function checkIfRepositoryExists(request, response, next) {
  const { id } = request.params
  const repoIndex = repositories.findIndex(repo => repo.id === id)
  
  if (repoIndex != -1) {
    request["repoIndex"] = repoIndex
    next()
  }

  response.status(400).send(`There aren't a repo with ID ${id}. Please send a valid repo id.`)
}

module.exports = app;
