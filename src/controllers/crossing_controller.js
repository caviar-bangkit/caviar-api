const connection = require("../config/database");
const Response = require("../helper/Response");
const StatusCode = require("../helper/StatusCode");

// Create a connection pool
const createPool = async () => {
  const config = {
    connectionLimit: 10,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
  };

  const pool = await connection(config);
  return pool;
};

const poolPromise = createPool();

// Get all crossings
const getAllsCrossing = async (req, res) => {
  try {
    const pool = await poolPromise;
    const db = await pool.getConnection();
    const crossings = await db.query("SELECT * FROM Crossing");
    db.release();
    return Response.success(res, "Data success fetch", crossings);
  } catch (error) {
    return Response.error(res, error.message, StatusCode.INTERNAL_SERVER_ERROR);
  }
};

// Get a crossing by id
const getCrossing = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const db = await pool.getConnection();
    const crossing = await db.query("SELECT * FROM Crossing WHERE id = $1", [
      id,
    ]);
    db.release();
    if (crossing.length !== 0) {
      return Response.success(res, "Data success fetch", crossing[0]);
    }
    return Response.error(res, "Data not found", StatusCode.NOT_FOUND);
  } catch (error) {
    return Response.error(res, error.message, StatusCode.INTERNAL_SERVER_ERROR);
  }
};

// Get nearest crossings by lat and lng params using earth radius formula
const getNearestCrossings = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    const pool = await poolPromise;
    const db = await pool.getConnection();

    // Check params
    if (lat === undefined || lng === undefined || radius === undefined) {
      return Response.error(
        res,
        "Please provide lat, lng, and radius",
        StatusCode.BAD_REQUEST
      );
    }

    // Search nearest crossing using earth radius formula
    const earthRadius = 6371; // earth radius in km
    const crossings = await db.query(`
      SELECT *, (${earthRadius} * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lng})) + sin(radians(${lat})) * sin(radians(latitude)))) AS distance
      FROM Crossing
      HAVING distance < ${radius}
      ORDER BY distance
      LIMIT 1
    `);
    db.release();
    if (crossings.length !== 0) {
      return Response.success(
        res,
        `Founding traffic light nearby`,
        crossings[0]
      );
    }
    return Response.error(res, "No traffic light nearby", StatusCode.NOT_FOUND);
  } catch (error) {
    return Response.error(res, error.message, StatusCode.INTERNAL_SERVER_ERROR);
  }
};

//Create crossing
const createCrossing = async (req, res) => {
  try {
    const { name, latitude, longitude, heading } = req.body;
    const pool = await poolPromise;
    const db = await pool.getConnection();
    // check duplicate
    const crossingDuplicate = await db.query(
      "SELECT * FROM Crossing WHERE name = $1",
      [name]
    );
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
    const crossing = await db.query(
      "INSERT INTO Crossing (name, latitude, longitude, heading) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, latitude, longitude, heading]
    );
    db.release();
    return Response.success(res, "Crossing created successfully", crossing);
  } catch (error) {
    return Response.error(res, error.message, StatusCode.INTERNAL_SERVER_ERROR);
  }
};

//Update crossing
const updateCrossing = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, latitude, longitude, heading } = req.body;
    const pool = await poolPromise;
    const db = await pool.getConnection();
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
    const crossing = await db.query(
      "UPDATE Crossing SET name = $1, latitude = $2, longitude = $3, heading = $4 WHERE id = $5 RETURNING *",
      [name, latitude, longitude, heading, id]
    );
    db.release();
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
    return Response.error(res, error.message, StatusCode.INTERNAL_SERVER_ERROR);
  }
};

//Delete crossing
const deleteCrossing = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const db = await pool.getConnection();
    const crossing = await db.query(
      "DELETE FROM Crossing WHERE id = $1 RETURNING *",
      [id]
    );
    db.release();
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
    return Response.error(res, error.message, StatusCode.INTERNAL_SERVER_ERROR);
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
