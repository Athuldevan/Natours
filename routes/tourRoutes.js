const express = require('express');

const router = express.Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('../controller/tourController');

//poarameter middleware
// router.param('id', checkId);

router.route(`/`)
.get(getAllTours).
post(createTour);


router.route(`/:id`).patch(updateTour).delete(deleteTour).get(getTour);

module.exports = router;
