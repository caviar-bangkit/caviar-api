const prisma = require("../prisma/connection");

// Get all crossings
const getAllsCrossing = async (req, res) => {
  try {
    const crossings = await prisma.crossing.findMany();
    return Response.success(res, "Data success fetch", crossings);
  } catch (error) {
    return Response.error(
      res,
      "Error on fetch",
      StatusCode.INTERNAL_SERVER_ERROR
    );
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
      return Response.success(res, `Data success fetch by id ${id}`, crossing);
    }
    return Response.error(
      res,
      `Crossing with id ${id} not found`,
      StatusCode.NOT_FOUND
    );
  } catch (error) {
    return Response.error(
      res,
      "Error on fetch",
      StatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

// Get nearest crossings by lat and lng params using earth radius formula
const getNearestCrossings = async (req, res) => {
  try {
    const { latitude: lat, longitude: lng, radius } = req.query;
    // check params
    if (lat === undefined || lng === undefined || radius === undefined) {
      return Response.error(
        res,
        "Please provide latitude, longitude, and radius",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }

    const earthRadius = 6371; // earth radius in km
    const crossings = await prisma.$queryRaw`
      SELECT *, (${earthRadius} * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lng})) + sin(radians(${lat})) * sin(radians(latitude)))) AS distance
      FROM Crossing
      HAVING distance < ${radius}
      ORDER BY distance
      LIMIT 1
    `;
    if (crossings.length !== 0) {
      return Response.success(
        res,
        `Founding traffic light nearby`,
        crossings[0]
      );
    }

    return Response.error(res, "No traffic light nearby", StatusCode.NOT_FOUND);
  } catch (error) {
    return Response.error(
      res,
      "Error on fetch",
      StatusCode.INTERNAL_SERVER_ERROR
    );
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
      return Response.error(
        res,
        `Crossing with name ${name} already exists`,
        StatusCode.CONFLICT
      );
    }
    // check params
    if (
      name === undefined ||
      latitude === undefined ||
      longitude === undefined ||
      heading === undefined
    ) {
      return Response.error(
        res,
        "Please provide name, latitude, longitude, and heading",
        StatusCode.BAD_REQUEST
      );
    }
    const crossing = await prisma.crossing.create({
      data: {
        name,
        latitude,
        longitude,
        heading,
      },
    });
    return Response.success(res, "Crossing created successfully", crossing);
  } catch (error) {
    return Response.error(
      res,
      "Error on fetch",
      StatusCode.INTERNAL_SERVER_ERROR
    );
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
      return Response.error(
        res,
        "Please provide name, latitude, longitude, and heading",
        StatusCode.BAD_REQUEST
      );
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
    if (crossing !== null) {
      return Response.success(
        res,
        `Crossing with id ${id} has been updated successfully`,
        crossing
      );
    } else {
      return Response.error(
        res,
        `Cannot update crossing with id ${id}, crossing not found`,
        StatusCode.NOT_FOUND
      );
    }
  } catch (error) {
    return Response.error(
      res,
      "Error on fetch",
      StatusCode.INTERNAL_SERVER_ERROR
    );
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
      return Response.success(
        res,
        `Crossing with id ${id} has been deleted successfully`,
        crossing
      );
    }
    return Response.error(
      res,
      `Cannot delete crossing with id ${id}, crossing not found`,
      StatusCode.NOT_FOUND
    );
  } catch (error) {
    return Response.error(
      res,
      "Error on fetch",
      StatusCode.INTERNAL_SERVER_ERROR
    );
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
