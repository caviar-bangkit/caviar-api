const router = require("express").Router();
const {
  getAllsCrossing,
  getCrossing,
} = require("../controllers/crossing_controller");

router.get("/crossings", getAllsCrossing);
router.get("/crossings/:id", getCrossing);

module.exports = router;
