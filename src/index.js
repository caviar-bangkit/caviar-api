const express = require("express");
const cors = require("cors");
const middleware = require('./middleware');
const { data } = require("./data");

const app = express();

app.use(express.json());
app.use(cors());
// app.use(middleware.decodeToken);

app.get("/api", (req, res) => {
  res.json({ data });
});

app.get("/api/:id", (req, res) => {
  const { id } = req.params;
  const crossing = data.find((crossing) => crossing.id == id);
  res.json({ data: crossing });
});

app.post("/api", (req, res) => {
  const { name, latitude, longitude, heading } = req.body;
  const id = Math.floor(Math.random() * 100000000);
  const newCrossing = { id, name, latitude, longitude, heading };
  data.push(newCrossing);
  res.json({ data: newCrossing });
});

app.put("/api/:id", (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude, heading } = req.body;
  const crossing = data.find((crossing) => crossing.id == id);
  crossing.name = name;
  crossing.latitude = latitude;
  crossing.longitude = longitude;
  crossing.heading = heading;
  res.json({ data: crossing });
});

app.delete("/api/:id", (req, res) => {
  const { id } = req.params;
  const index = data.findIndex((crossing) => crossing.id === id);
  data.splice(index, 1);
  res.json({ data: id });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the CAVIAR API" });
});

const server = app.listen(5000, () =>
  console.log(`
🚀 Server ready at: http://localhost:5000`)
);