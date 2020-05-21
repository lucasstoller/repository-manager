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

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
