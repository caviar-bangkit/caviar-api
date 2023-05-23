const prisma = require("../prisma/connection");

// Get all crossings
const getAllsCrossing = async (req, res) => {
  try {
    const crossings = await prisma.crossing.findMany();
    res.json(crossings);
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
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
    if (crossing !== null) {
      res.json(crossing);
      return;
    }
    res.status(404).json({ error: `Crossing with id ${id} not found` });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
};

// Get nearest crossings by lat and lng params using earth radius formula
const getNearestCrossings = async (req, res) => {
  try {
    const { radius: radius, latitude: lat, longitude: lng } = req.params;
    const earthRadius = 6371; // earth radius in km
    const crossings = await prisma.$queryRaw`
      SELECT *, (${earthRadius} * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lng})) + sin(radians(${lat})) * sin(radians(latitude)))) AS distance
      FROM Crossing
      HAVING distance < ${radius}
      ORDER BY distance
      LIMIT 1
    `;
    if (crossings.length !== 0) {
      res.json(
        crossings.map((crossing) => {
          return {
            name: crossing.name,
            latitude: crossing.latitude,
            longitude: crossing.longitude,
            "distance based on earth radius (km)": crossing.distance,
          };
        })
      );
      return;
    }
    res.status(404).json({ error: `No crossings found within ${radius} km` });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
};

//Create crossing
const createCrossing = async (req, res) => {
  try {
    const { name, latitude, longitude, heading } = req.body;
    // check duplicate
    const crossingDuplicate = await prisma.crossing.findUnique({
      where: {
        name: name,
      },
    });
    if (crossingDuplicate !== null) {
      res.status(400).json({ error: `Crossing ${name} already exists` });
      return;
    }
    // check params
    if (
      name === undefined ||
      latitude === undefined ||
      longitude === undefined ||
      heading === undefined
    ) {
      res.status(400).json({
        error: "Please provide name, latitude, longitude, and heading",
      });
      return;
    }
    const crossing = await prisma.crossing.create({
      data: {
        name,
        latitude,
        longitude,
        heading,
      },
    });
    res.json(crossing);
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
};

//Update crossing
const updateCrossing = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, latitude, longitude, heading } = req.body;
    // check params
    if (
      name === undefined ||
      latitude === undefined ||
      longitude === undefined ||
      heading === undefined
    ) {
      res.status(400).json({
        error: "Please provide name, latitude, longitude, and heading",
      });
      return;
    }
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
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
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
    if (crossing !== null) {
      res.json(`Crossing with id ${id} has been deleted successfully`);
      return;
    }
    res.status(404).json({
      error: `Cannot delete crossing with id ${id}, crossing not found`,
    });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
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
