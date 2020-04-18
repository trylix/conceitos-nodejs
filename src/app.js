const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const repository = { id: uuid(), ...request.body, likes: 0 };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indice = repositories.findIndex((elem) => elem.id === id);

  if (indice === -1) return response.sendStatus(400);

  const { title, url, techs } = request.body;

  const repository = repositories.find(elem => elem.id === id);

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  repositories[indice] = repository;
  
  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indice = repositories.findIndex((elem) => elem.id === id);

  if (indice === -1) return response.sendStatus(400);

  repositories.splice(indice, 1);

  return response.sendStatus(204);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find((elem) => elem.id === id);

  if (!repository) return response.sendStatus(400);

  repository.likes += 1;

  return response.status(201).json(repository);
});

module.exports = app;
