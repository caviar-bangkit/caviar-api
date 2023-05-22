const prisma = require("../connection");

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

// Get nearest crossings by lat and lng params using earth radius formula
const getNearestCrossings = async (req, res) => {
  try {
    const { latitude: lat, longitude: lng } = req.params;
    const radius = 6371; // earth radius in km
    const crossings = await prisma.$queryRaw`
      SELECT *, (${radius} * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lng})) + sin(radians(${lat})) * sin(radians(latitude)))) AS distance
      FROM Crossing
      ORDER BY distance
      LIMIT 1
    `;
    res.json(crossings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create crossing
const createCrossing = async (req, res) => {
  try {
    const { name, latitude, longitude, heading } = req.body;
    const crossing = await prisma.crossing.create({
      data: {
        name,
        latitude,
        longitude,
        heading,
      },
    });
    res.json(crossing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update crossing
const updateCrossing = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, latitude, longitude, heading } = req.body;
    const crossing = await prisma.crossing.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        latitude,
        longitude,
        heading,
      },
    });
    res.json(crossing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete crossing
const deleteCrossing = async (req, res) => {
  try {
    const { id } = req.params;
    const crossing = await prisma.crossing.delete({
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
  getNearestCrossings,
  createCrossing,
  updateCrossing,
  deleteCrossing,
};
