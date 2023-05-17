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
router.post("/getNearestCrossings", getNearestCrossings);
router.post("/createCrossing/:id", createCrossing);
router.post("/updateCrossing/:id", updateCrossing);
router.delete("/deleteCrossing/:id", deleteCrossing);


module.exports = router;
