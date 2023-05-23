const express = require("express");
const router = express.Router();
const {
  getAllsCrossing,
  getCrossing,
  getNearestCrossings,
  createCrossing,
  updateCrossing,
  deleteCrossing,
} = require("../controllers/crossing_controller");

router.get("/crossings", getAllsCrossing);
router.get("/crossings/:id", getCrossing);
router.get("/crossing/nearest", getNearestCrossings);
router.post("/crossing", createCrossing);
router.put("/crossing/:id", updateCrossing);
router.delete("/crossing/:id", deleteCrossing);

module.exports = router;
