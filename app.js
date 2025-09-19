const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouter');

const app = express();
app.set('query parser', 'extended');

// 1. MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

//Routes -- mainly resource routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Undefiner routes handling Error Middleware
app.use((req, res, next) => {
  const err = new Error(`Cant get the url : ${req.url}`);
  err.status = 'failed';
  err.statusCode = 404;
  next(err);
});

//Global error handling middleware
app.use((err, req, res, next) => {
  const status = err.status;
  const statusCode = err.statusCode;
  return res.status(statusCode).json({
    status: status,
    message: err.message,
  });
});

module.exports = app;
