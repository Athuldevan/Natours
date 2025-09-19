const mongoose = require('mongoose');

// Defining a schmea
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have  a name'],
      unique: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: [true, 'A true must have a duration'],
    },

    maxGroupSize: {
      type: Number,
      require: [true, 'A tour must have a group size.'],
    },

    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },

    price: {
      type: Number,
      required: [true, 'Price should be specified'],
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    priceDiscount: Number,

    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },

    description: {
      type: String,
      trim: true,
    },

    imageCover: {
      type: String,
      required: [true, 'A tour must have a images'],
    },

    images: {
      type: [String],
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    startDate: [Date],
    test: String,
  },

  {
    toJSON: { virtuals: true },
  },
);

//creating a virtuals properties
tourSchema.virtual('duration_weeks').get(function () {
  return this.duration / 7;
});

//mongoose middleware
tourSchema.pre('save', function (next) {
  console.log('will save the document');
  this.test = 'testing';

  next();
});

//Creating a new Modal or collection
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
