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

// Get nearest crossings by lat and lng params using earth radius formula
const getNearestCrossings = async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const radius = 6371; // earth radius in km
    const crossings = await prisma.$queryRaw`
      SELECT id, name, lat, lng, ( ${radius} * acos( cos( radians(${lat}) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( lat ) ) ) ) AS distance
      FROM crossings
      HAVING distance < 1 -- 1 km radius from current location
      ORDER BY distance
      LIMIT 0 , 5;  -- show only 5 nearest crossings
    `;
    res.json(crossings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create crossing
const createCrossing = async (req, res) => {
  try {
  const crossings = await prisma.crossings.createMany({
      data: {
        id: ' ',
        name: ' ',
        latitude: ' ',
        longtitude: ' ',
        heading: '  ',
        created: '  ',
      },
    });
    res.json(crossings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update crossing
const updateCrossing = async (req, res) => {
  try {
    const { id } = req.params;
    const crossing = await prisma.crossing.update({
      where: {
        id: Number(id),
      },
      data: {
        name: ' ',
        latitude: ' ',
        longtitude: ' ',
        heading: '  ',
        created: '  ',
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
