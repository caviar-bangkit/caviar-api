const prisma = require("../src/connection");

// Get all crossings
const getAllsCrossing = async (req, res) => {
  try {
    const crossings = await prisma.crossing.findMany();
    res.json(crossings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a crossing by id
const getCrossing = async (req, res) => {
  try {
    const { id } = req.params;
    const crossing = await prisma.crossing.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(crossing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllsCrossing,
  getCrossing,
};
