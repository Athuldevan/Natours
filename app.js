const express = require('express');
const morgan = require('morgan');
const rateLimiter = require('express-rate-limit');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouter');
// const AppError = require('./utils/appError');

const limiter = rateLimiter({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: {
    status: 429,
    message: 'Too many request, Please try again after an hour!/',
  },
  standardHeaders: true,
  legacyHeaders: true,
});

const app = express();
app.set('query parser', 'extended');
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', limiter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

// app.use((req, res, next) => {
//   next(new AppError(404, `Can't find the url : ${req.originalUrl}`));
// });

module.exports = app;
