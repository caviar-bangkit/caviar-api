const express = require("express");
const cors = require("cors");
const CrossingRoute = require("./routes/crossing_route");
<<<<<<< Updated upstream
=======
const middleware = require('./middleware');
>>>>>>> Stashed changes

const app = express();

app.use(express.json());
app.use(cors());
app.use(middleware.decodeToken);

app.use("/api", CrossingRoute);
<<<<<<< Updated upstream
=======

app.get('/api/todos', (req, res) => {
	return res.json({
		todos: [
			{
				title: 'Task1',
			},
			{
				title: 'Task2',
			},
			{
				title: 'Task3',
			},
		],
	});
});
>>>>>>> Stashed changes

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the CAVIAR API" });
});

const server = app.listen(5000, () =>
  console.log(`
<<<<<<< Updated upstream
🚀 Server ready at: http://localhost:3000`)
=======
🚀 Server ready at: http://localhost:5000`)
>>>>>>> Stashed changes
);
