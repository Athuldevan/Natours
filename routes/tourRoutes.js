const express = require('express');

const router = express.Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} = require('../controller/tourController');

//poarameter middleware
// router.param('id', checkId);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route(`/`).get(getAllTours).post(createTour);

router.route(`/:id`).patch(updateTour).delete(deleteTour).get(getTour);

module.exports = router;
