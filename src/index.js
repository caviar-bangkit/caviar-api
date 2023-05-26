const express = require("express");
const cors = require("cors");
const CrossingRoute = require("./routes/crossing_route");
const middleware = require('./middleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(middleware.decodeToken);

app.use("/api", CrossingRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the CAVIAR API" });
});

const server = app.listen(5000, () =>
  console.log(`
🚀 Server ready at: http://localhost:5000`)
);
