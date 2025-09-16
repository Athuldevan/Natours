const Tour = require('../models/tourModal');

// Get all Tours.
async function getAllTours(req, res) {
  try {
    const queryObj = { ...req.query };
    const excluded = ['page', 'sort', 'limit', 'fileds'];
    excluded.forEach((el) => delete queryObj[el]);

    const query = Tour.find(queryObj);
    const tours = await query;

    res.status(200).json({
      status: 'success',
      data: { tours },
    });
  } catch (error) {
    res.status(400).json({
      status: ' failed',
      message: error,
    });
  }
}

// Get a single Tour.
async function getTour(req, res) {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'Success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
}

// Create a single Tour.
async function createTour(req, res) {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newTour,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
}

// Update tour
async function updateTour(req, res) {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        runValidators: true,
        new: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
}

//  Delete Tour
async function deleteTour(req, res) {
  try {
    const id = req.params.id;
    await Tour.findByIdAndDelete(id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
}

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
