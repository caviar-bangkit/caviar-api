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
router.get("/crossing/:id", getCrossing);
router.get(
  "/crossing/nearest/:radius/:latitude/:longitude",
  getNearestCrossings
);
router.post("/crossing", createCrossing);
router.put("/crossing/:id", updateCrossing);
router.delete("/crossing/:id", deleteCrossing);

module.exports = router;
