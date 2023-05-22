const router = require("express").Router();
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
router.get("/crossings/nearest/:latitude/:longtitude", getNearestCrossings);
router.post("/crossings", createCrossing);
router.put("/crossings/:id", updateCrossing);
router.delete("/crossings/:id", deleteCrossing);

module.exports = router;
