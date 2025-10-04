const express = require('express');

const { protect, restrictTo } = require('../controller/authController');
const router = express.Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourStats,
  aliasTopTours,
} = require('../controller/tourController');

//poarameter middleware
// router.param('id', checkId);

router.route('/').get(protect, getAllTours).post(createTour);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);

router
  .route(`/:id`)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)
  .get(getTour);

module.exports = router;
