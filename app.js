const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouter');
// const AppError = require('./utils/appError');

const app = express();
app.set('query parser', 'extended');
app.use(morgan('dev'));
app.use(express.json());




app.use('/api/v1/users', userRouter)
app.use('/api/v1/tours', tourRouter);

// app.use((req, res, next) => {
//   next(new AppError(404, `Can't find the url : ${req.originalUrl}`));
// });

module.exports = app;
