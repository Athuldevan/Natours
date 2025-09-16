const Tour = require('../models/tourModal');
const APIFeatures = require('../utils/apiFeatures');

async function aliasTopTours(req, res, next) {
  try {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong..');
  }
}

// Get all Tours.
async function getAllTours(req, res) {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const tours = await features.query;

    //SENDING RESPONSE
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
  aliasTopTours,
};
