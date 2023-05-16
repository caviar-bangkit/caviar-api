const express = require("express");
const cors = require("cors");
const CrossingRoute = require("../routes/crossing_route");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", CrossingRoute);

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`)
);
