const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();
app.set('query parser', 'extended');

// 1. MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

//Routes -- mainly resource routes
app.use('/', userRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Undefiner routes handling Error Middleware
app.use((req, res, next) => {
  next(new AppError(404, `Can't find the url : ${req.originalUrl}`));
});

//Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
